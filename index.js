const mypromise = (fn, ...args) => {
  const options = typeof fn === 'object' ? fn : {};

  const func = typeof fn === 'function' ? fn : args.length === 0 ? null : args[0];

  if (typeof func !== 'function') {
    throw new Error(`${func} is not an object`);
  }

  if (typeof fn === 'object') {
    // we need shift args by one as first paramter is "options"
    // second is function
    // and rest are arguments
    args.shift();
  }

  const argsAsPromises = args.map(curr => Promise.resolve(curr));
  return Promise.all(argsAsPromises)
  .then(async results => {
    const finalResult = await Promise.resolve(func(...results));
    if (options.log) {
      const _logger = global.logger || console;
      try {
        _logger.debug('Resolving %s: %s', options.id || '<unnamed>', JSON.stringify(finalResult, null, 2));
      } catch (err) {
        _logger.debug('Resolving %s: %s', options.id || '<unnamed>', finalResult);
      }
    }
    return finalResult;
  }).catch(error => {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(error);
  });
};

mypromise.finalObj = (obj) => {
  if (typeof obj !== 'object') {
    throw new Error(`${obj} is not an object`);
  }
  const keys = Object.keys(obj);
  const valuesAsPromises = keys.map(key => Promise.resolve(obj[key]));
  return Promise.all(valuesAsPromises)
  .then(values => {
    const result = {};
    keys.forEach((key, index) => {
      result[key] = values[index];
    });
    return result;
  }).catch(error => {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(error);
  })
};

mypromise.finalArr = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error(`${arr} is not an array`);
  }
  const elemsAsPromises = arr.map(curr => Promise.resolve(curr));
  return Promise.all(elemsAsPromises)
  .then(values => values)
  .catch(error => {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(error);
  })
};

mypromise.final = (obj) => {
  if (typeof obj !== 'object' && !Array.isArray(obj)) {
    throw new Error(`${obj} is not an object or array`);
  }
  if (Array.isArray(obj)) {
    return mypromise.finalArr(obj);
  }
  return mypromise.finalObj(obj);
};

module.exports = mypromise;
