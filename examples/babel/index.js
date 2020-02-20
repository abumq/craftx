import mypromise, { create as createFinalObj } from '../../src';

const myFunc = mypromise(() => 123);

const res = myFunc();

createFinalObj({
  res,
}).then(result => console.log(result))
