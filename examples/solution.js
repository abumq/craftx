const mypromise = require('../');
const exampleUtils = require('./example-utils');

const userInfo = mypromise(exampleUtils.queryUserInfo);
const accountInfo = mypromise(exampleUtils.queryAccountInfo, userInfo);

const finalResult = mypromise.final({
  userInfo,
  accountInfo,
}).then(({ userInfo, accountInfo }) => {
  console.log({
    userInfo,
    accountInfo,
  });
})
