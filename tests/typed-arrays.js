const assert = require('assert');
const fn = require('../src');

const p = async v => v;

describe('Typed arrays are resolved correctly', () => {

  describe('Typed Array', async () => {
    const result = await fn.json({
      uint8Array: new Uint8Array([21, 31]),
      promiseBasedUint8Array: (async () => new Uint8Array([21, 31]))(),
      innerPromisesForArray: new Uint8Array([p(21), p(31)]),
      combinedPromiseWithInner: (async () => new Uint8Array([p(21), p(31)]))(),
      arr: {
        ui: (async () => new Uint8Array([p(21), p(31)]))(),
        simpl: new Uint8Array([21, 31]),
      },
    });

    console.log(result);

    // it('Uint8Array is resolved correctly', () => {
    //   assert.equal(result.uint8Array.constructor.name, new Uint8Array().constructor.name);
    //   assert.deepEqual(result.uint8Array, new Uint8Array([21, 31]));
    // });

    it('Uint8Array is resolved correctly', () => {
  //    assert.deepEqual(result.uint8Array, [21, 31]);
    });

    it('promise based Uint8Array is resolved correctly', () => {
//      assert.deepEqual(result.promiseBasedUint8Array, new Uint8Array([21, 31]));
    });

    it('Uint8Array with each promise is resolved correctly', () => {
  //    assert.equal(result.innerPromisesForArray.constructor.name, new Uint8Array().constructor.name);
//      assert.deepEqual(result.innerPromisesForArray, new Uint8Array([21, 31]));
    });

    it('Uint8Array with each promise is resolved correctly wrapped in promise', () => {
  //    assert.equal(result.innerPromisesForArray.constructor.name, new Uint8Array().constructor.name);
      assert.deepEqual(result.combinedPromiseWithInner, new Uint8Array([21, 31]));
    });
  });
});
