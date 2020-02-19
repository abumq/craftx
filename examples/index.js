const mypromise = require('../');
const exampleUtils = require('./example-utils');

const generateObj = (err = false) => {
  const userInfo = mypromise.call(exampleUtils.queryUserInfo);
  const accountInfo = mypromise.call(exampleUtils.queryAccountInfo, userInfo);
  const systemInfo = mypromise.call(exampleUtils.querySystemInfo);
  const config = mypromise.call(exampleUtils.queryConfig, 'web');
  const withErr = err ? mypromise.call(exampleUtils.thisFnThrows)
    .catch(err => console.log('This was thrown to show you how to catch errors', err.message)) : null;

  return mypromise.create({
    title: 'example',
    account: accountInfo,
    systemInfo,
    config,
    withErr,
  });
};

generateObj().then(result => {
  console.log(result);
});
