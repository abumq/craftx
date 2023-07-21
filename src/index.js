// Copyright (c) 2020-present @abumq (Majid Q.)
//
// https://github.com/abumq/craftx
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

const get = require('lodash.get');
const { fn, exec, fnExport } = require('./fn');
const { json } = require('./json');

// default export
module.exports = fn;

// name exports from fn
module.exports.fn = fn;
module.exports.fnExport = fnExport;
module.exports.exec = exec;
module.exports.fnjson = (theSyncFunc) => fn(async (obj, ...anythingElse) => theSyncFunc(await json(obj), ...anythingElse));

// name exports from json
module.exports.json = json;

// get value from the object using lodash.get
// when object is resolved
module.exports.get = (objOrPromise, path, defaultVal, options = {}) =>
  fn(o => get(o, path) || defaultVal, options)
  (objOrPromise);
