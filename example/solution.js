const truepromise = require('../');
const exampleUtils = require('./example-utils');

const userInfo = truepromise(exampleUtils.queryUserInfo);
const accountInfo = truepromise(exampleUtils.queryAccountInfo, userInfo);

const finalResult = truepromise.final({
  userInfo,
  accountInfo,
}).then(({ userInfo, accountInfo }) => {
  console.log({
    userInfo,
    accountInfo,
  });
})
