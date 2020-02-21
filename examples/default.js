const fn = require('../src');
const exampleUtils = require('./example-utils');

const queryUserInfo = fn(exampleUtils.queryUserInfo);
const queryAccountInfo = fn(exampleUtils.queryAccountInfo);

const userInfo = queryUserInfo();
const accountInfo = queryAccountInfo(userInfo);

const finalResult = fn.create({
  userInfo,
  accountInfo,
}).then(({ userInfo, accountInfo }) => {
  console.log({
    userInfo,
    accountInfo,
  });
})
