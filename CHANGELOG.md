## Unreleased

## 3.2.4
- No change to API (ghost release)
- Using Github actions to publish package and run tests

## 3.1.4
- No change to API

## 3.1.0

- Added helper `fnjson` to convert a sync function that takes object and return async function

## 3.0.2

- Minor documentation update to make things clear

## 3.0.1

- `get` with default value as second parameter

## 3.0.0

- BREAKING: Swapped first parameter to be always function for `fn()` and second to be options.
- FEATURE: Added `get` for getting path in object when resolved
- FEATURE: Added second parameter to `json()` for options

## 2.0.4

- Typed error for `TypeError`

## 2.0.3

- Updates to `setOptions` and added test coverage for it
- Fix error when function is of incorrect type

## 2.0.2

- Changed default export to `fn()`
- Added `fnExport` helper function

## 2.0.1

- Migration from makefun
- Resolution for typed arrays and other built-in data structure types
- More formal test for values
- Retain the type of objects (e.g, Set, Map etc)
- Removed `createArr`, `createObj` and `create()` (use `json()`)
- Renamed `call()` to `exec()`
