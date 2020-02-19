import mypromise, { final } from '../../';

const myFunc = mypromise(() => 123);

const res = myFunc();

final({
  res,
}).then(result => console.log(result))
