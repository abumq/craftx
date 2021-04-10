const fn = require('makefun');

//
// If we have bunch of promise based functions
//
const queryPerson_ = () => Promise.resolve({
  id: 1,
  name: 'John',
});

const queryDetails_ = (person) => Promise.resolve({
  profile: 'His name is ' + person.name + ' (' + person.id + ')',
});

const queryCompany_ = () => Promise.resolve({
  name: 'Amrayn Web Services',
  department: 'IT',
});
/////////////////////////////////////////////////////////


//
// We makefun of them
//
const queryPerson = fn(queryPerson_);
const queryDetails = fn(queryDetails_);
// We do not need to makefun this function
// as we do not require any promise based parameter
// but we'll just do it to keep the consistency
const queryCompany = fn(queryCompany_);


/////////////////////////////////////////////////////////


// We have a function that is going to call various promise based
// functions and some require the return values of others
const buildProps = () => {

  // Note how we are not using any await
  // meaning it's querying everything in parrallel
  // and returned with single await
  const person = queryPerson();
  const details = queryDetails(person);
  const company = queryCompany();

  return fn.create({
    bio: person,
    details,
    company,
  });
}



/////////////////////////////////////////////////////////



(async () => {
  // note buildProps is a promise
  const props = buildProps();
  
  // and data is also returning promise
  const data = Promise.resolve(123);

  const result = await fn.final({
    props,
    data
  });
  
  // the result is following (with only one await!):
  //
  // {
  //   props: {
  //     bio: { id: 1, name: 'John' },
  //     details: { profile: 'His name is John (1)' },
  //     company: { name: 'Amrayn Web Services', department: 'IT' }
  //   },
  //   data: 123
  // }
  
  console.log(result);
})();
