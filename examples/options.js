const { fn, json } = require('../src');
const exampleUtils = require('./example-utils');

const queryUserInfo = fn(exampleUtils.queryUserInfo);
const queryAccountInfo = fn({
  debug: true,
  startTime: (name, desc) => {
    console.log('startTime for %s', name);
  },
  endTime: (name) => {
    console.log('endTime for %s', name);
  },
}, exampleUtils.queryAccountInfo);

const accountInfo = queryAccountInfo(queryUserInfo());

(async () => {
  const r = await json({
    accountInfo,
  });

  console.log(r);

})();
