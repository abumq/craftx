const { fn, json } = require('../src');
const exampleUtils = require('./example-utils');

const queryUserInfo = fn(exampleUtils.queryUserInfo);
const queryAccountInfo = fn(exampleUtils.queryAccountInfo, {
  debug: true,
  startTime: (name, desc) => {
    console.log('startTime for %s', name);
  },
  endTime: (name) => {
    console.log('endTime for %s', name);
  },
});

(async () => {
  console.log(await queryAccountInfo(queryUserInfo()))
})();
