const exampleUtils = require('./example-utils');

Promise.all([
  exampleUtils.queryUserInfo(),
  exampleUtils.queryAccountInfo(),
]).then(([userInfo, accountInfo]) => {
  console.log(accountInfo);
})
