const { get } = require('../src');

const getProfile = async (uid) => ({
  name: 'John_' + uid,
  age: 45,
  father: {
    name: 'Peter_' + uid,
  },
});

(async () => {
  console.log(await get(getProfile(123), 'father.name')) // output: Peter_123
  console.log(await get(getProfile(123), 'mother.name', 'Steph')) // output: Steph
  console.log(await get(getProfile(123), 'brother.name')) // output: undefined
})();
