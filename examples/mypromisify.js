const mypromise = require('../');
const exampleUtils = require('./example-utils');

const queryUserInfo = mypromise(exampleUtils.queryUserInfo);
const queryAccountInfo = mypromise(exampleUtils.queryAccountInfo);

const userInfo = queryUserInfo();
const accountInfo = queryAccountInfo(userInfo);

const finalResult = mypromise.create({
  userInfo,
  accountInfo,
}).then(({ userInfo, accountInfo }) => {
  console.log({
    userInfo,
    accountInfo,
  });
})
