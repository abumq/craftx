const assert = require('assert');
const craftx = require('../src');

const { queryPerson, getResponse } = require('./utils');

describe('Test get', () => {
  it('Get resolves to correct value', async () => {
    const r = await craftx.get(getResponse(), 'status')
    assert.equal(r, 200)
  });

  it('Exception handled correctly', async () => {
    try {
      const r = await craftx.get(getResponse(true), 'status');
      assert.fail()
    } catch (e) {
      assert.equal(e.message, 'Thrown intentionally')
    }
  });

  it('Default values are resolved correctly', async () => {
    const r = await craftx.get(getResponse(), 'non-existant', 500)
    assert.equal(r, 500)
  });

  it('get options work correctly', async () => {
    const timerResult = { start: false, end: false };

    const r = await craftx.get(getResponse(), 'status', undefined, {
      startTime: () => timerResult.start = true,
      endTime: () => timerResult.end = true,
    })

    assert.equal(r, 200)
    assert.equal(timerResult.start, true);
    assert.equal(timerResult.end, true);
  });
});
