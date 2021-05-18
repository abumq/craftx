const { get } = require('../src');

const getProfile = async (uid) => ({
  name: 'John_' + uid,
  age: 45,
  father: {
    name: 'Peter_' + uid,
  },
});

(async () => {
  console.log(await get(getProfile(123), 'father.name'))
})();
