const fn = require('makefun');

const queryPerson = () => Promise.resolve({
  id: 1,
  name: 'John',
});

const queryDetails = (person) => Promise.resolve({
  profile: 'His name is ' + person.name + ' (' + person.id + ')',
});

const queryCompany = () => Promise.resolve({
  name: 'Amrayn Web Services',
  department: 'IT',
});

const queryPerson2 = fn(queryPerson);
const queryDetails2 = fn(queryDetails);

const buildProps = () => {

  // Note how we are not using any await
  // meaning it's querying everything in parrallel
  // and returned with single await
  const person = queryPerson2();
  const details = queryDetails2(person);
  const company = queryCompany();

  return fn.create({
    bio: person,
    details,
    company,
  });
}

(async () => {
  const result = await buildProps();
  console.log(result);
})();
