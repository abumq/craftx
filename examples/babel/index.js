import { create, final } from '../../';

const myFunc = create(() => 123);

const res = myFunc();

final({
  res,
}).then(result => console.log(result))
