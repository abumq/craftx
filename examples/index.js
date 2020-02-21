const makefun = require('../src');
const exampleUtils = require('./example-utils');

const generateObj = (err = false) => {
  const userInfo = makefun.call(exampleUtils.queryUserInfo);
  const accountInfo = makefun.call(exampleUtils.queryAccountInfo, userInfo);
  const systemInfo = makefun.call(exampleUtils.querySystemInfo);
  const config = makefun.call(exampleUtils.queryConfig, 'web');
  const withErr = err ? makefun.call(exampleUtils.thisFnThrows)
    .catch(err => console.log('This was thrown to show you how to catch errors', err.message)) : null;

  return makefun.create({
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
