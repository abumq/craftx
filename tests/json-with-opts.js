const assert = require('assert');
const craftx = require('../src');

const { queryPerson } = require('./utils');

describe('JSON with options', () => {

  it('options timer work as expected', () => {
    const timerResult = {
      abc: { started: false, ended: false },
      def: { started: false, ended: false },
    };

    craftx.json({
      person: queryPerson(),
    }, {
      name: 'abc',
      startTime: (n) => timerResult[n].started = true,
      endTime: (n) => timerResult[n].ended = true,
    })
    .then(() => {
      assert.deepEqual(timerResult, {
        abc: { started: true, ended: true },
        def: { started: false, ended: false },
      })
    })
  });


  it('array options timer work as expected', () => {
    const timerResult = {
      abc: { started: false, ended: false },
      def: { started: false, ended: false },
    };

    craftx.json([
      queryPerson(),
    ], {
      name: 'def',
      startTime: (n) => timerResult[n].started = true,
      endTime: (n) => timerResult[n].ended = true,
    })
    .then(result => {
      assert.deepEqual(result, [
        {
          age: 85,
          height: 173,
          id: 1,
          name: 'John',
          weight: 70
        }
      ])
      assert.deepEqual(timerResult, {
        def: { started: true, ended: true },
        abc: { started: false, ended: false },
      })
    })
  });


  it('array within object options timer work as expected', () => {
    const timerResult = {
      abc: { started: false, ended: false },
      def: { started: false, ended: false },
    };

    craftx.json({
      people: [queryPerson()],
      list: [1,2,3],
      simple: 'abcdef',
    }, {
      name: 'def',
      startTime: (n) => timerResult[n].started = true,
      endTime: (n) => timerResult[n].ended = true,
    })
    .then(result => {
      assert.deepEqual(result, {
        list: [
          1,
          2,
          3
        ],
        people: [
          {
            age: 85,
            height: 173,
            id: 1,
            name: 'John',
            weight: 70
          }
        ],
        simple: 'abcdef'
      })
      assert.deepEqual(timerResult, {
        def: { started: true, ended: true },
        abc: { started: false, ended: false },
      })
    })
  });

});
