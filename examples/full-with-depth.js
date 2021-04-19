const fn = require('../src');

//
// If we have bunch of promise based functions
//

const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

const buildPerson_ = (details) => Promise.resolve(details);

const queryPerson_ = () => buildPerson_({
  id: 1,
  name: 'John',
  age: 85,
  height: 173,
  weight: 70,
});

const queryDetails_ = async (person) => {
//  await snooze(3000)

  return {
    description: `His name is ${person.name} (${person.id})`,
    ageDescription: `Age is ${person.age}`,
  }
};

const queryProfile_ = async (person) => {
//  await snooze(2000)

  return {
    height: `This person is ${person.height} cm tall`,
    weight: `This person is ${person.weight} kg in weight`,
  }
};

const queryCompany_ = () => Promise.resolve({
  name: 'Amrayn Web Services',
  department: 'IT',
});
/////////////////////////////////////////////////////////


//
// We makefun of them
//
const buildPerson = fn(buildPerson_);
const queryPerson = fn(queryPerson_);
const queryProfile = fn(queryProfile_);
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
  const profile = queryProfile(person);
  const company = queryCompany();

  return fn.create({
    bio: person,
    details,
    profile: {
      profileDetails: profile,
    },
    realDeep: {
      level2: {
        level3: {
          profileDepth: profile,
        },
      },
    },
    company,
  });
}


/////////////////////////////////////////////////////////

// same thing is also supported for array
const buildPeopleList = () => {

  const john = queryPerson();

  const mike = buildPerson({
    id: 2,
    name: 'Mike',
    age: 43,
    height: 180,
    weight: 63,
  });

  return fn.create([
    mike,
    john,
  ]);
}

/////////////////////////////////////////////////////////



(async () => {
  // note buildProps is a promise
  const props = buildProps();

  const listOfPeople = buildPeopleList();

  // and data is also returning promise
  const data = Promise.resolve(123);

  const result = await fn.final({
    props,
    data,
    people: listOfPeople,
  });

  // the result is following (with only one await!):
  // {
  //   "props": {
  //     "bio": {
  //       "id": 1,
  //       "name": "John",
  //       "age": 85,
  //       "height": 173,
  //       "weight": 70
  //     },
  //     "details": {
  //       "description": "His name is John (1)",
  //       "ageDescription": "Age is 85"
  //     },
  //     "profile": {
  //       "profileDetails": {
  //         "height": "This person is 173 cm tall",
  //         "weight": "This person is 70 kg in weight"
  //       }
  //     },
  //     "realDeep": {
  //       "level2": {
  //         "level3": {
  //           "profileDepth": {
  //             "height": "This person is 173 cm tall",
  //             "weight": "This person is 70 kg in weight"
  //           }
  //         }
  //       }
  //     },
  //     "company": {
  //       "name": "Amrayn Web Services",
  //       "department": "IT"
  //     }
  //   },
  //   "data": 123,
  //   "people": [
  //     {
  //       "id": 2,
  //       "name": "Mike",
  //       "age": 43,
  //       "height": 180,
  //       "weight": 63
  //     },
  //     {
  //       "id": 1,
  //       "name": "John",
  //       "age": 85,
  //       "height": 173,
  //       "weight": 70
  //     }
  //   ]
  // }

  console.log(JSON.stringify(result, null, 2))
})();
