const mypromise = require('../');
const exampleUtils = require('./example-utils');

const queryUserInfo = mypromise.mypromisify({ name: 'queryUserInfo' }, exampleUtils.queryUserInfo);
const queryAccountInfo = mypromise.mypromisify(exampleUtils.queryAccountInfo);

const userInfo = queryUserInfo();
const accountInfo = queryAccountInfo(userInfo);

const queryCompanyInfo = () => ({
  name: 'Amrayn Web Services',
  url: 'https://amrayn.com',
});
// if you specify "options" under function, it will be overriden
queryCompanyInfo.options = {
  name: 'queryCompanyInfo',
};
const companyInfo = mypromise({ debug: true }, queryCompanyInfo);

// this promise is to demonstrate the option override
new Promise(async (resolve) => {
  // this is best way to override options set with mypromisify
  queryUserInfo.options.debug = true;
  const newUserInfo = await queryUserInfo(); // to show you can even await the function
  console.log(JSON.stringify(newUserInfo));
  resolve();
})

mypromise.final({ // wait() is an alias of final
  companyInfo,
  accountInfo,
}).then(result => {
  console.log(JSON.stringify(result, null, 2));
})
