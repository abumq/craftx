// Copyright (c) 2020 Amrayn Web Services
// Copyright (c) 2020 @abumusamq
//
// https://github.com/amrayn/
// https://amrayn.com
// https://humble.js.org
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

const queryUserInfo = async () => {
  await snooze(800);
  return {
    name: 'Majid',
    dob: '25/03/1986',
  };
};

const queryAccountInfo = async (user) => {
  await snooze(500);
  return {
    preferences: 32,
    permissions: 7,
    user,
  };
};

const thisFnThrows = async () => {
  throw new Error('thisFnThrows Error');
};

// example of independant
const querySystemInfo = async () => {
  await snooze(200);
  return {
    load: 14.0,
  };
};

// example of promise
const queryConfig = (sender) => new Promise(async (resolve) => {
  await snooze(300);
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
};
