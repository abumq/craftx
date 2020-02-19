# mypromise
Use promise once it is satisfied otherwise wait for the promise

```
yarn add @amrayn/mypromise
```

<br>

[![Donate](https://amrayn.github.io/donate.png?v2)](https://amrayn.com/donate)

## Problem
There are times when you want to use promise values once the promise is fulfilled. This library helps you achieve this goal using native promise mechanism.

The following example shows you why this library is useful. We will walk you through the example and provide explanation where necessary. Please note, a runnable version of same example is available under `/example` directory.

Let's say you have various utility functions to query the database.

```javascript
const queryUserInfo = async () => ({
  username: '@abumusamq'
});

const queryAccountInfo = async (user) => ({
  user,
  created: '19-02-2020'
});
```

Notice the `queryAccountInfo` requires `user` object that will be provided by `queryUserInfo`. If you use `Promise.all` directly (without this library) you won't be able to provide this (resolved) user object to `queryAccountInfo`.

```javascript
Promise.all([
  queryUserInfo(),
  queryAccountInfo(),
]).then(([userInfo, accountInfo]) => {
  console.log(accountInfo);
})

```

This will result in:

```javascript
{
  user: undefined,
  created: '19-02-2020'
}
```

because user was never passed in (and we could not have done it unless we separated it out in to a separate promise call)

## Solution
`mypromise` allows you to pass in the function and any arguments that function takes, be it promise or a static argument.

```javascript
const mypromise = require('mypromise');

const userInfo = mypromise(queryUserInfo);
const accountInfo = mypromise(queryAccountInfo, userInfo);
```

Once you have everything in place, you will finally create an object or array with utility functions.

```javascript
const finalResult = mypromise.final({
  userInfo,
  accountInfo,
}).then(({ userInfo, accountInfo }) => {
  console.log({
    accountInfo,
  });
})
```

This will result in:

```javascript
{
  user: {
    username: '@abumusamq'
  },
  created: '19-02-2020'
}
```

which is correctly resolved.

## License
```
Copyright (c) 2020 Amrayn Web Services
Copyright (c) 2020 @abumusamq

https://github.com/amrayn/
https://amrayn.com
https://humble.js.org

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
