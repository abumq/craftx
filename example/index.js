const truepromise = require('../');
const exampleUtils = require('./example-utils');

const generateObj = (err = false) => {
  const userInfo = truepromise(exampleUtils.queryUserInfo);
  const accountInfo = truepromise(exampleUtils.queryAccountInfo, userInfo);
  const systemInfo = truepromise(exampleUtils.querySystemInfo);
  const config = truepromise(exampleUtils.queryConfig, 'web');
  const withErr = err ? truepromise(exampleUtils.thisFnThrows)
    .catch(err => console.log('This was thrown to show you how to catch errors', err.message)) : null;

  return truepromise.final({
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
