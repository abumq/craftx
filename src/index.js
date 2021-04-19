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

const makefun = (optOrFn, ...args) => {
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

async function resolveDeepObject(obj, depth, currentKey) {
  if (typeof obj === 'object' && typeof obj.then === 'function') {
    // is promise
    return Promise.resolve(obj)
  }

  if (depth === MAX_DEPTH) {
    throw new Error(`Exhausted depth supported by makefun ${depth} at ${currentKey}`);
  }

  if (typeof obj === 'object') {
    const keys = Object.keys(obj);

    return Promise.all(
      keys.map(key =>
        resolveDeepObject(obj[key], depth + 1, key)
      )
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

const createObject = (obj) => {
  if (typeof obj !== 'object') {
    throw new Error(`${obj} is not an object`);
  }
  return resolveDeepObject(obj, 1, '<root>');
};

const createArray = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error(`${arr} is not an array`);
  }
  return Promise.all(arr.map(curr => Promise.resolve(curr)))
  .catch(error => {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(error);
  })
};

const create = (obj) => {
  if (typeof obj !== 'object' && !Array.isArray(obj)) {
    throw new Error(`${obj} is not an object or array`);
  }
  if (Array.isArray(obj)) {
    return createArray(obj);
  }
  return createObject(obj);
};

// wrapper is inner and always accept opt and fn
const toFunWrapper = (opt, fn) => {
  const result = (...args) => makefun(opt, fn, ...args);
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

module.exports = toFun;
module.exports.toFun = toFun;
module.exports.create = create;
module.exports.createObj = createObject;
module.exports.createArr = createArray;

// aliases
module.exports.call = makefun;
module.exports.final = create;
module.exports.wait = create;
module.exports.json = create;
