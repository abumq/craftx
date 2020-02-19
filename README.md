# mypromise
Use promise once it is satisfied otherwise wait for the promise

```
yarn add @amrayn/mypromise
```

<br>

[![Donate](https://amrayn.github.io/donate.png?v2)](https://amrayn.com/donate)

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
`mypromise` allows you to pass in the function and any arguments that function takes, be it promise or a static argument.

```javascript
const mypromise = require('@amrayn/mypromise');

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

**`final` is also called `wait` - you can use either one**

## Advanced

### Options
You can pass option as first argument in both `mypromise()` and `mypromise.create`. If the first argument is object, the second must be the function.

```javascript
const accountInfo = mypromise({debug: true}, queryAccountInfo, userInfo);

// or with create / mypromisify
const queryUserInfo_ = mypromise.create({debug: true}, queryUserInfo);
const queryUserInfo_ = mypromise.mypromisify({debug: true}, queryUserInfo);
```

Following are the possible options

| **Option** | **Description** |
|--|--|
| `name` | An identity for the function |
| `description` | A description for the function |
| `startTime` | Function for [server timing](https://www.w3.org/TR/server-timing/) - `(name, description) => {}` - the `name` and `description` is passed back to this function |
| `endTime` | Function for [server timing](https://www.w3.org/TR/server-timing/) - `(name) => {}` - the `name` is passed back to this function |
| `debug` | Boolean value to tell mypromise whether debug logging is enabled or not. It will use a global `logger.debug()` object. If no such object exists, it will use `console.debug()` |

**Note: Options can be override later after mypromisified version of function is created - see `/examples/override-options`**

### "mypromisify" Functions
The above is basic usage of the library. You can simplify the usage by creating a "mypromisified" function. It is extremely easy to do that.

```javascript
const mypromise = require('@amrayn/mypromise');

const queryUserInfo_ = mypromise.mypromisify(queryUserInfo);
const queryAccountInfo_ = mypromise.mypromisify(queryAccountInfo);

const userInfo = queryUserInfo_();
const accountInfo = queryAccountInfo(userInfo);
```

**This function is also called `create`** so you can do:

```javascript
import mypromise from 'mypromise'; // or import { create } ...

const queryUserInfo = mypromise.create(queryUserInfo);
```

#### Can I "mypromisify" all my functions?
Absolutely! The library is designed so all the functions can safely be "mypromisified". This means you can create all your functions like:

```javascript
const mypromise = require('mypromise');

const myfn = mypromise.mypromisify(() => {
  console.log('wifi')
})

const myfn2 = mypromise.mypromisify(async () => {
  console.log('wifi2')
})

new Promise(async (resolve) => {
  myfn();
  await myfn2() // you can await your promisified functions
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

export default mypromisify(myAwesomeFunc);
export {
  myAwesomeFunc2: mypromisify(myAwesomeFunc2),
   // with options (options can be overriden at any time without need of importing the library)
  myAwesomeFunc3: mypromisify({ name: 'myAwesomeFunc3' }, myAwesomeFunc3),
}
```

That way you don't have to re-import library where you are using the function.

You can safely override the options, e.g,

[this is pseudo-example and won't work as is]

```javascript
import { myAwesomeFunc2, myAwesomeFunc3 } from 'my-awesome-utils';

export default (req, res, next) {
  myAwesomeFunc2.options = {
    // hint: server-timing
    startTime: res.startTime,
    endTime: res.endTime,
  };

  // this will keep the original name and override "debug" option
  myAwesomeFunc3.options = {
    debug: true,
  };

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
