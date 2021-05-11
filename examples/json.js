const craftx = require('../src');
const originalExamples = require('./example-utils');

const exampleUtils = craftx.fnExport(originalExamples)

const generateObj = (err = false) => {
  const userInfo = exampleUtils.queryUserInfo();
  const accountInfo = exampleUtils.queryAccountInfo(userInfo);
  const systemInfo = exampleUtils.querySystemInfo();
  const config = exampleUtils.queryConfig('web');
  const simple = exampleUtils.simple();
  const withoutErr = err ? exampleUtils.thisFnThrows()
    .catch(err => console.log('This was thrown to show you how to catch errors', err.message)) : null;

  return craftx.json({
    title: 'example',
    account: accountInfo,
    systemInfo,
    simple,
    config,
    withoutErr,
    exc: [
      1, 2, exampleUtils.thisFnThrows(false)
    ],
  });
};

generateObj().then(result => {
  console.log(result);
});
