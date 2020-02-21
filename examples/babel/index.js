import makefun, { create as createFinalObj } from '../../src';

const myFunc = makefun(() => 123);

const res = myFunc();

createFinalObj({
  res,
}).then(result => console.log(result))
