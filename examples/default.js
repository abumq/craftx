const makefun = require('../src');
const exampleUtils = require('./example-utils');

const queryUserInfo = makefun(exampleUtils.queryUserInfo);
const queryAccountInfo = makefun(exampleUtils.queryAccountInfo);

const userInfo = queryUserInfo();
const accountInfo = queryAccountInfo(userInfo);

const finalResult = makefun.create({
  userInfo,
  accountInfo,
}).then(({ userInfo, accountInfo }) => {
  console.log({
    userInfo,
    accountInfo,
  });
})
