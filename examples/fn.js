const { fn, json } = require('../src');
const exampleUtils = require('./example-utils');

const queryUserInfo = fn(exampleUtils.queryUserInfo);
const queryAccountInfo = fn(exampleUtils.queryAccountInfo);

const accountInfo = queryAccountInfo(queryUserInfo());

(async () => {
  const r = await json({
    accountInfo,
  });

  console.log(r);

})();
