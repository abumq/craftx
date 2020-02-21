# 🤝 makefun
Use promise values when they are satisfied without awaiting

<p align="center">
  <a aria-label="Build Status" href="https://travis-ci.org/amrayn/makefun">
    <img alt="" src="https://img.shields.io/travis/amrayn/makefun/master.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/makefun">
    <img alt="" src="https://img.shields.io/npm/v/makefun.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="License" href="https://github.com/amrayn/makefun/blob/master/LICENSE">
    <img alt="" src="https://img.shields.io/npm/l/makefun?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="Donate via PayPal" href="https://amrayn.com/donate">
    <img alt="" src="https://img.shields.io/static/v1?label=Donate&message=PayPal&color=purple&style=for-the-badge&labelColor=000000">
  </a>
</p>

```
yarn add makefun
```

## Problem
There are times when you want to use promise values once the promise is fulfilled. This library helps you achieve this goal using native promise mechanism.

The following example shows you why this library is useful. We will walk you through the example and provide explanation where necessary. Please note, a runnable version of same example is available at `/examples/index.js`.

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
`makefun` allows you to pass in the function and any arguments that function takes, be it promise or a static argument.

```javascript
const fn = require('makefun');

const userInfo = fn.call(queryUserInfo);
const accountInfo = fn.call(queryAccountInfo, userInfo);
```

Once you have everything in place, you will finally create an object or array with utility functions.

```javascript
const finalResult = fn.create({
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

**`create` is also called `final` and `wait` - you can use either one**

You can also use `createObj` or `createArr` instead of `create` but you must provide object/array respectively. `create()` automatically checks for the provided type.

## Advanced

### Options
You can pass option as first argument in both `fn()` and `fn.call()`. If the first argument is object, the second must be the function.

```javascript
const accountInfo = fn.call({debug: true}, queryAccountInfo, userInfo);

// or
const queryUserInfo_ = fn({debug: true}, queryUserInfo);
```

Following are the possible options

| **Option** | **Description** |
|--|--|
| `name` | An identity for the function. Defaults to `<function>.name` - **IT MUST NOT CONTAIN SPACE** |
| `description` | A description for the function |
| `startTime` | Function for [server timing](https://www.w3.org/TR/server-timing/) - `(name, description) => {}` - the `name` and `description` is passed back to this function |
| `endTime` | Function for [server timing](https://www.w3.org/TR/server-timing/) - `(name) => {}` - the `name` is passed back to this function |
| `debug` | Boolean value to tell makefun whether debug logging is enabled or not. It will use a global `logger.debug()` object. If no such object exists, it will use `console.debug()` |

**Note: Options can be override later after mypromisified version of function is created - see `/examples/override-options`**

### Create Functions
The above is basic usage of the library. You can simplify the usage by creating a "mypromisified" function. It is extremely easy to do that.

```javascript
const fn = require('makefun');

const queryUserInfo_ = fn(queryUserInfo);
const queryAccountInfo_ = fn(queryAccountInfo);

const userInfo = queryUserInfo_();
const accountInfo = queryAccountInfo(userInfo);
```

#### Can I do this to all my functions?
Absolutely! As the name of library suggests, it is designed so all the functions can safely be turned in to this. This means you can create all your functions like:

```javascript
const fn = require('makefun');

const myfn = fn(() => {
  console.log('wifi')
})

const myfn2 = fn(async () => {
  console.log('wifi2')
})

new Promise(async (resolve) => {
  myfn();
  await myfn2() // you can await your functions
  resolve();
})
```

You can even export all your functions like this:

[this is pseudo-example and won't work as is]

```javascript
const myAwesomeFunc = () => {};
const myAwesomeFunc2 = () => {};
const myAwesomeFunc3 = () => {};
// ...

export default makefun(myAwesomeFunc);
export {
  myAwesomeFunc2: makefun(myAwesomeFunc2),
   // with options (options can be overriden at any time without need of importing the library)
  myAwesomeFunc3: makefun({ name: 'myAwesomeFunc3' }, myAwesomeFunc3),
}
```

That way you don't have to re-import library where you are using the function.

You can safely override the options, e.g,

[this is pseudo-example and won't work as is]

```javascript
import { myAwesomeFunc2, myAwesomeFunc3 } from 'my-awesome-utils';

export default (req, res, next) {
  myAwesomeFunc2.setOptions({
    // hint: server-timing
    startTime: res.startTime,
    endTime: res.endTime,
  });

  // this will keep the original name and override "debug" option
  myAwesomeFunc3.setOptions({ debug: true });

  myAwesomeFunc2();
  myAwesomeFunc3();
}
```

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
