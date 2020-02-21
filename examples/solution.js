const fn = require('../src');
const exampleUtils = require('./example-utils');

const userInfo = fn.call(exampleUtils.queryUserInfo);
const accountInfo = fn.call(exampleUtils.queryAccountInfo, userInfo);

const finalResult = fn.create({
  userInfo,
  accountInfo,
}).then(({ userInfo, accountInfo }) => {
  console.log({
    userInfo,
    accountInfo,
  });
})
