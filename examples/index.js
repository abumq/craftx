const craftx = require('../src');
const exampleUtils = require('./example-utils');

const generateObj = (err = false) => {
  const userInfo = craftx.exec(exampleUtils.queryUserInfo);
  const accountInfo = craftx.exec(exampleUtils.queryAccountInfo, userInfo);
  const systemInfo = craftx.exec(exampleUtils.querySystemInfo);
  const config = craftx.exec(exampleUtils.queryConfig, 'web');
  const withErr = err ? craftx.exec(exampleUtils.thisFnThrows)
    .catch(err => console.log('This was thrown to show you how to catch errors', err.message)) : null;

  return craftx.json({
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
