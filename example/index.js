const mypromise = require('../');
const exampleUtils = require('./example-utils');

const generateObj = (err = false) => {
  const userInfo = mypromise(exampleUtils.queryUserInfo);
  const accountInfo = mypromise(exampleUtils.queryAccountInfo, userInfo);
  const systemInfo = mypromise(exampleUtils.querySystemInfo);
  const config = mypromise(exampleUtils.queryConfig, 'web');
  const withErr = err ? mypromise(exampleUtils.thisFnThrows)
    .catch(err => console.log('This was thrown to show you how to catch errors', err.message)) : null;

  return mypromise.final({
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
