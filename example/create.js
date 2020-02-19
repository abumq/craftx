const mypromise = require('../');
const exampleUtils = require('./example-utils');

const queryUserInfo = mypromise.create(exampleUtils.queryUserInfo);
const queryAccountInfo = mypromise.create({ log: true, id: 'queryAccountInfo' }, exampleUtils.queryAccountInfo);

const userInfo = queryUserInfo();
const accountInfo = queryAccountInfo(userInfo);

const finalResult = mypromise.final({
  userInfo,
  accountInfo,
}).then(({ userInfo, accountInfo }) => {
  console.log({
    userInfo,
    accountInfo,
  });
})
