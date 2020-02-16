const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

const queryUserInfo = async () => {
  //await snooze(800);
  return {
    name: 'John',
    dob: '25/03/1986',
  };
};

const queryAccountInfo = async (user) => {
  //await snooze(500);
  return {
    preferences: 32,
    permissions: 7,
    user,
  };
};

const thisFnThrows = async (doThrow = true) => {
  if (doThrow) {
    throw new Error('thisFnThrows Error');
  }

  return 123;
};

const simple = () => {
  return 'abc';
};

// example of independant
const querySystemInfo = async () => {
  //await snooze(200);
  return {
    load: 14.0,
  };
};

// example of promise
const queryConfig = (sender) => new Promise(async (resolve) => {
  //await snooze(300);
  resolve({
    url: 'https://amrayn.com',
    sender,
  });
});

module.exports = {
  querySystemInfo,
  queryUserInfo,
  queryAccountInfo,
  thisFnThrows,
  queryConfig,
  simple,
};
