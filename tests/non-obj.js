const assert = require('assert');
const fn = require('../src');

it('Non object values', async () => {
  const result = await fn.json(123);
  assert.equal(result, 123);
});


it('Non object promise', async () => {
  const result = await fn.json(Promise.resolve(123));
  assert.equal(result, 123);
});
