const assert = require('assert');
const craftx = require('../src');

it('Non object values', async () => {
  const result = await craftx.json(123);
  assert.equal(result, 123);
});


it('Non object promise', async () => {
  const result = await craftx.json(Promise.resolve(123));
  assert.equal(result, 123);
});
