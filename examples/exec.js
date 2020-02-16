const { exec } = require('../src');
const { queryAccountInfo, queryUserInfo } = require('./example-utils');

(async () => {
  console.log(await exec(queryAccountInfo, queryUserInfo()));
})();
