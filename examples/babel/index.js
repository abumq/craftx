import mypromise, { create as createFinalObj } from '../../';

const myFunc = mypromise(() => 123);

const res = myFunc();

createFinalObj({
  res,
}).then(result => console.log(result))
