# mypromise
Use promise once it is satisfied otherwise wait for the promise

```
yarn add mypromise
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
The MIT License (MIT)

Copyright (c) 2020 Amrayn Web Services
Copyright (c) 2020 @abumusamq

https://github.com/amrayn/
https://amrayn.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```
