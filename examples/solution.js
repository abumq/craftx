const mypromise = require('../');
const exampleUtils = require('./example-utils');

const userInfo = mypromise.call(exampleUtils.queryUserInfo);
const accountInfo = mypromise.call(exampleUtils.queryAccountInfo, userInfo);

const finalResult = mypromise.final({
  userInfo,
  accountInfo,
}).then(({ userInfo, accountInfo }) => {
  console.log({
    userInfo,
    accountInfo,
  });
})
