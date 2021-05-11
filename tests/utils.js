const fn = require('../src');

const buildPerson_ = (details) => Promise.resolve(details);

const queryPerson_ = () => buildPerson_({
  id: 1,
  name: 'John',
  age: 85,
  height: 173,
  weight: 70,
});

const queryDetails_ = (person) => Promise.resolve({
  description: `His name is ${person.name} (${person.id})`,
  ageDescription: `Age is ${person.age}`,
});

const queryProfile_ = (person) => Promise.resolve({
  height: `This person is ${person.height} cm tall`,
  weight: `This person is ${person.weight} kg in weight`,
});

const queryCompany_ = () => Promise.resolve({
  name: 'Amrayn Web Services',
  department: 'IT',
});

module.exports.buildPerson = fn(buildPerson_);
module.exports.queryPerson = fn(queryPerson_);
module.exports.queryProfile = fn(queryProfile_);
module.exports.queryDetails = fn(queryDetails_);
module.exports.queryCompany = fn(queryCompany_);
