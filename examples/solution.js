const makefun = require('../src');
const exampleUtils = require('./example-utils');

const userInfo = makefun.call(exampleUtils.queryUserInfo);
const accountInfo = makefun.call(exampleUtils.queryAccountInfo, userInfo);

const finalResult = makefun.create({
  userInfo,
  accountInfo,
}).then(({ userInfo, accountInfo }) => {
  console.log({
    userInfo,
    accountInfo,
  });
})
