const assert = require('assert');
const craftx = require('../src');

const { queryPerson, throwableObj } = require('./utils');

describe('Test get', () => {
  it('Get resolves to correct value', () => {
    craftx.get(throwableObj(false), 'status')
    .then(r => assert.equal(r, 200))
  });

  it('Exception handled correctly', () => {
    craftx.get(throwableObj(), 'status')
    .then(r => assert.fail())
    .catch(e => assert.equal(e.message, 'Thrown intentionally'))
  });
});
