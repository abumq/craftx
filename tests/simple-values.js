const assert = require('assert');
const craftx = require('../src');

describe('Simple values are resolved correctly', () => {
  describe('Simple premitive', async () => {
    const result = await craftx.json({
      num: 123,
      str: 'simple',
      fl: 1.2,
      bool: true,
    });

    it('string is resolved correctly', () => {
      assert.equal(result.str, 'simple');
    });

    it('number is resolved correctly', () => {
      assert.equal(result.num, 123);
    });

    it('float is resolved correctly', () => {
      assert.equal(result.fl, 1.2);
    });

    it('bool is resolved correctly', () => {
      assert.equal(result.bool, true);
    });
  });

  describe('Simple Object & Array', async () => {
    const theDate = new Date();

    const result = await craftx.json({
      arr: [1,2,3],
      arr2: new Array(1,2,3),
      obj: new Object({ 1: 'one' }),
      date: theDate,
      theUndefined: undefined,
      theNull: null,
    });

    it('array is resolved correctly', () => {
      assert.deepEqual(result.arr, [1,2,3]);
    });

    it('array (typed) is resolved correctly', () => {
      assert.deepEqual(result.arr2, [1,2,3]);
    });

    it('object is resolved correctly', () => {
      assert.deepEqual(result.obj, { 1: 'one' });
    });

    it('date is resolved correctly', () => {
      assert.deepEqual(result.date, theDate);
    });

    it('null is resolved correctly', () => {
      assert.deepEqual(result.theNull, null);
    });

    it('undefined is resolved correctly', () => {
      assert.deepEqual(result.theUndefined, undefined);
    });
  });

  describe('Map & Set', async () => {
    const contacts = new Map();
    contacts.set('Jessie', { phone: "213-555-1234", address: "123 N 1st Ave" });
    contacts.set('Hilary', { phone: "213-555-1235", address: "124 N 1st Ave" });

    const result = await craftx.json({
      set: new Set([3, 1, 2, 3]),
      map: contacts,
    });

    it('set is resolved correctly', () => {
      assert.deepEqual(result.set, new Set([3, 1, 2]));
      assert.equal(result.set.constructor.name, new Set().constructor.name);
    });

    it('map is resolved correctly', () => {
      assert.deepEqual(result.map, contacts);
      assert.equal(result.map.constructor.name, new Map().constructor.name);
    });

  });
});
