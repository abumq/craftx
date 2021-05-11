// Copyright (c) 2020-present Amrayn Web Services
//
// https://github.com/amrayn/
// https://amrayn.com
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const MAX_DEPTH = 64;

const ARRAY_TYPES = {
  'Array': Array,
  // TypedArray - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
  'Int8Array': Int8Array,
  'Uint8Array': Uint8Array,
  'Uint8ClampedArray': Uint8ClampedArray,
  'Int16Array': Int16Array,
  'Uint16Array': Uint16Array,
  'Int32Array': Int32Array,
  'Uint32Array': Uint32Array,
  'Float32Array': Float32Array,
  'Float64Array': Float64Array,
  'BigInt64Array': BigInt64Array,
  'BigUint64Array': BigUint64Array,
};

const TYPED_ARRAY_NAMES = Object.keys(ARRAY_TYPES);

// List of items that do not require
// any further resolution and must be returned
// as is.
const NO_RESOLUTION_CLASS_LIST = [
  'Date', 'Set', 'Map',

  'ArrayBuffer', 'SharedArrayBuffer',
  ...TYPED_ARRAY_NAMES,
];

const functionify = (optOrFn, ...args) => {
  let options = {};

  const func = typeof optOrFn === 'function' ? optOrFn : args[0];

  if (typeof func !== 'function') {
    throw new Error(`${func} is not an object`);
  }

  if (typeof optOrFn === 'object') {
    // we need shift args by one as first paramter is "options"
    // second is function
    // and rest are arguments
    args.shift();
    // options may be overridden
    options = {
      ...(optOrFn || {}),
      ...(func.options || {}),
    };
  } else {
    // options may be overridden
    options = {
      ...(optOrFn.options || {}),
    };
  }
  if (!options.name && func.name !== '') {
    options.name = func.name;
  }
  if (options.startTime) {
    options.startTime(options.name, options.description);
  }
  const argsAsPromises = args.map(curr => Promise.resolve(curr));
  return Promise.all(argsAsPromises).then(async results => {
    try {
      const finalResult = await Promise.resolve(func(...results));
      if (options.debug) {
        const _logger = global.logger || console;
        try {
          _logger.debug('Resolving %s: %s', options.name || '<unnamed>', JSON.stringify(finalResult, null, 2));
        } catch (err) {
          _logger.debug('Resolving %s: %s', options.name || '<unnamed>', finalResult);
        }
      }
      return finalResult;
    } finally {
      if (options.endTime) {
        options.endTime(options.name);
      }
    }
  }).catch(error => {
    if (options.endTime) {
      options.endTime(options.name);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(error);
  });
};

// if [].from() is available use that otherwise use constructor
const createArrInstance = (ArrayInstanceType, items) =>
  typeof ArrayInstanceType.from === 'function' ?
    ArrayInstanceType.from(items) : new ArrayInstanceType(...items);

// do not use Array.isArray as it won't resolve typed arrays
const isArrayType = o => o && !!ARRAY_TYPES[o.constructor.name];

const createArray = (arr, depth, currentKey) => {
  if (depth === MAX_DEPTH) {
    throw new Error(`Exceeded array depth supported by craftjson ${depth} at ${currentKey}`);
  }

  if (!arr) {
    return Promise.resolve(arr);
  }

  const ArrayInstanceType = ARRAY_TYPES[arr.constructor.name] || Array;

  // Something to note here
  // Promise.all resolves it to Array instead of typed array
  // so we do not have a way to resolve correct array type at
  // top level
  return Promise.all(createArrInstance(ArrayInstanceType, arr.map(curr => {
    if (isArrayType(curr)) {
      return createArray(curr, depth + 1, currentKey);
    }

    return create(curr);
  })))
  .catch(error => {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(error);
  })
};

const createObject = (obj, depth, currentKey) => {

  if (depth === MAX_DEPTH) {
    throw new Error(`Exceeded object depth supported by craftjson ${depth} at ${currentKey}`);
  }

  if (!obj) {
    return Promise.resolve(obj);
  }

  if (typeof obj === 'object' && typeof obj.then === 'function') {
    // inside promise
    return Promise.resolve(obj)
  }

  if (obj.constructor) {
    const constructorName = obj.constructor.name;
    if (NO_RESOLUTION_CLASS_LIST.some(f => f === constructorName)) {
      if (TYPED_ARRAY_NAMES.some(f => f === constructorName)) {
        return createArray(obj, 1, currentKey);
      }
      return obj;
    }
  }

  if (typeof obj === 'object') {
    const keys = Object.keys(obj);

    return Promise.all(
      keys.map(key => createObject(obj[key], depth + 1, key))
    )
    .then(values =>
      keys.reduce((accum, key, idx) => ({
        ...accum,
        [key]: values[idx],
      }), {})
    )
    .catch(error => {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(error);
    })
  }
  return obj;
}

function create(val) {
  if (!val || val === null || typeof val !== 'object') {
    return val;
  }

  if (isArrayType(val)) {
    return createArray(val, 1, '<root array>');
  }

  return createObject(val, 1, '<root>');
};

// wrapper is inner and always accept opt and fn
const toFunWrapper = (opt, fn) => {
  const result = (...args) => functionify(opt, fn, ...args);
  result.options = opt || {};
  result.setOptions = (newOptions) => {
    if (!newOptions) {
      throw new Error(`${newOptions} is not an object`);
    }
    Object.keys(newOptions).forEach(currOptKey => {
      result.options[currOptKey] = newOptions[currOptKey];
    });
  };
  return result;
}

const toFun = (optOrFn, fn) => {
  if (typeof optOrFn === 'function') {
    return toFunWrapper({}, optOrFn);
  }
  return toFunWrapper(optOrFn, fn);
};

module.exports.fn = toFun;

module.exports.exec = functionify;
module.exports.json = create;
