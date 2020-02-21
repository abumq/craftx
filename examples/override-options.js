const makefun = require('../src');
const exampleUtils = require('./example-utils');

const queryUserInfo = makefun({ name: 'queryUserInfo', debug: false }, exampleUtils.queryUserInfo);
const queryAccountInfo = makefun(exampleUtils.queryAccountInfo);

const userInfo = queryUserInfo();
const accountInfo = queryAccountInfo(userInfo);

const queryCompanyInfo = makefun({
  name: 'queryCompanyInfo',
}, async () => ({
  name: 'Amrayn Web Services',
  url: 'https://amrayn.com',
}));

const createCompanyInfo = makefun({ name: 'createCompanyInfo' }, queryCompanyInfo);


/*
// this promise is to demonstrate the option override
new Promise(async (resolve) => {
  // this is best way to override options set with makefun()
  queryUserInfo.setOptions({ debug: true })
  const newUserInfo = await queryUserInfo(); // to show you can even await the function
  console.log(JSON.stringify(newUserInfo));
  resolve();
})
*/

createCompanyInfo.setOptions({
  description: 'creates company info',
});
queryCompanyInfo.setOptions({
  description: 'queries company info',
});

makefun.create({ // wait() and final() are aliases of create
  companyInfo: queryCompanyInfo(),
  accountInfo,
}).then(result => {
  console.log(JSON.stringify(result, null, 2));
})
