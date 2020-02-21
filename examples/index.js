const fn = require('../src');
const exampleUtils = require('./example-utils');

const generateObj = (err = false) => {
  const userInfo = fn.call(exampleUtils.queryUserInfo);
  const accountInfo = fn.call(exampleUtils.queryAccountInfo, userInfo);
  const systemInfo = fn.call(exampleUtils.querySystemInfo);
  const config = fn.call(exampleUtils.queryConfig, 'web');
  const withErr = err ? fn.call(exampleUtils.thisFnThrows)
    .catch(err => console.log('This was thrown to show you how to catch errors', err.message)) : null;

  return fn.create({
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
