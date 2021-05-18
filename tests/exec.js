const assert = require('assert');
const craftx = require('../src');

const queryUsername = async (title = '') => `${title}john`;
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('Using exec()', () => {
  describe('without parameter', () => {
    it('without parameter should return correct result', async () => {
      assert.equal(await craftx.exec(queryUsername), 'john');
    });

    it('without parameter timer works', async () => {
      const timerResult = { start: false, end: false };

      const name = await craftx.exec({
        startTime: () => timerResult.start = true,
        endTime: () => timerResult.end = true,
      }, queryUsername);

      assert.equal(name, 'john');
      assert.equal(timerResult.start, true);
      assert.equal(timerResult.end, true);
    });
  });

  describe('with parameter', () => {
    it('with parameter should return correct result', async () => {
      assert.equal(await craftx.exec(queryUsername, 'mr. '), 'mr. john');
    });

    it('with parameter timer works', async () => {
      const timerResult = { start: false, end: false };

      const name = await craftx.exec({
        startTime: () => timerResult.start = true,
        endTime: () => timerResult.end = true,
      }, queryUsername, 'mr. ');

      assert.equal(name, 'mr. john');
      assert.equal(timerResult.start, true);
      assert.equal(timerResult.end, true);
    });

    it('with parameter returned by promise resolves correctly', async () => {
      const queryTitle = async () => 'Mr. ';

      const userTitle = queryTitle();
      assert.equal(await craftx.exec(queryUsername, userTitle), 'Mr. john');
    });
  });
});

describe('Using craftx.fn()', () => {

  // has options
  const newQueryUsername = craftx.fn(queryUsername, {
    name: 'newQueryUsername',
  });

  // no options
  const rawQueryUsername = craftx.fn(queryUsername);

  describe('without parameter', () => {
    it('without parameter should return correct result', async () => {
      assert.equal(await newQueryUsername(), 'john');
    });

    it('without parameter timer works with present options', async () => {
      const timerResult = { start: false, end: false };

      newQueryUsername.setOptions({
        startTime: () => timerResult.start = true,
        endTime: () => timerResult.end = true,
      });

      const name = await newQueryUsername();

      assert.equal(name, 'john');
      assert.equal(timerResult.start, true);
      assert.equal(timerResult.end, true);
    });

    it('without parameter timer works WITHOUT preset options', async () => {
      const timerResult = { start: false, end: false };

      rawQueryUsername.setOptions({
        startTime: () => timerResult.start = true,
        endTime: () => timerResult.end = true,
        name: 'rawQueryUsername',
        debug: true,
      });

      const name = await rawQueryUsername();

      assert.equal(name, 'john');
      assert.equal(timerResult.start, true);
      assert.equal(timerResult.end, true);
    });
  });

  describe('with parameter', () => {
    it('with parameter should return correct result', async () => {
      assert.equal(await newQueryUsername('mr. '), 'mr. john');
    });

    it('with parameter timer works', async () => {
      const timerResult = { start: false, end: false };

      const name = await craftx.exec({
        startTime: () => timerResult.start = true,
        endTime: () => timerResult.end = true,
      }, queryUsername, 'mr. ');

      assert.equal(name, 'mr. john');
      assert.equal(timerResult.start, true);
      assert.equal(timerResult.end, true);
    });

    it('with parameter returned by promise resolves correctly', async () => {
      const queryTitle = async () => 'Mr. ';

      const userTitle = queryTitle();
      assert.equal(await craftx.exec(queryUsername, userTitle), 'Mr. john');
    });
  });
});
