// const assert = require('assert');
// const fn = require('../src');
//
// const { queryPerson, queryDetails, queryProfile, queryCompany, buildPerson } = require('./utils');
//
// describe('Objects resolution', async () => {
//   const buildProps = () => {
//
//     // Note how we are not using any await
//     // meaning it's querying everything in parrallel
//     // and returned with single await
//     const person = queryPerson();
//     const details = queryDetails(person);
//     const profile = queryProfile(person);
//     const company = queryCompany();
//
//     return fn.json({
//       bio: person,
//       details,
//       profile: {
//         profileDetails: profile,
//       },
//       realDeep: {
//         level2: {
//           level3: {
//             profileDepth: profile,
//           },
//         },
//       },
//       company,
//     });
//   }
//
//   const props = await buildProps();
//
//   it('Objects (top-level) are resolved correctly', async () => {
//     assert.deepEqual(props.bio, {
//       id: 1,
//       name: 'John',
//       age: 85,
//       height: 173,
//       weight: 70,
//     });
//   });
//
//   it('Objects (simple-second-level) are resolved correctly', async () => {
//     assert.deepEqual(props.profile.profileDetails, {
//       height: `This person is 173 cm tall`,
//       weight: `This person is 70 kg in weight`,
//     });
//   });
//
//   it('Objects (very deep) are resolved correctly', async () => {
//     assert.deepEqual(props.realDeep.level2.level3.profileDepth, {
//       height: `This person is 173 cm tall`,
//       weight: `This person is 70 kg in weight`,
//     });
//   });
// });
//
// describe('Array resolution', async () => {
//   const buildPeopleList = () => {
//
//     const john = queryPerson();
//
//     const mike = buildPerson({
//       id: 2,
//       name: 'Mike',
//       age: 43,
//       height: 180,
//       weight: 63,
//     });
//
//     return fn.json([
//       mike,
//       john,
//     ]);
//   }
//
//   const people = await buildPeopleList();
//
//   it('Array resolved correctly', async () => {
//     assert.equal(people.length, 2);
//     assert.equal(people[0].id, 2);
//     assert.equal(people[0].name, 'Mike');
//     assert.equal(people[0].age, 43);
//     assert.equal(people[0].height, 180);
//     assert.equal(people[0].weight, 63);
//
//     assert.equal(people[1].id, 1);
//     assert.equal(people[1].name, 'John');
//     assert.equal(people[1].age, 85);
//     assert.equal(people[1].height, 173);
//     assert.equal(people[1].weight, 70);
//   });
// });
//
// describe('Inner array object resolution', async () => {
//
//   const p = async v => v;
//
//   const buildPeopleList = () => {
//
//     const john = queryPerson();
//
//     const mike = buildPerson({
//       id: 2,
//       name: 'Mike',
//       age: 43,
//       height: 180,
//       weight: 63,
//     });
//
//     return fn.json({
//       timeTaken: 1.2,
//       list: [
//         mike,
//         john,
//       ],
//       ageRange: new Array([21, 31]),
//       balances: new Array([p(2100), 334]),
//       deepPeople: new Array([p(mike), p(john)]),
//     });
//   }
//
//   const result = await buildPeopleList();
//
//   it('Array resolved correctly', async () => {
//     assert.deepEqual(result, {
//       timeTaken: 1.2,
//       list: [
//         {
//           age: 43,
//           height: 180,
//           id: 2,
//           name: 'Mike',
//           weight: 63
//         },
//         {
//           age: 85,
//           height: 173,
//           id: 1,
//           name: 'John',
//           weight: 70
//         },
//       ],
//       ageRange: new Array([21, 31]),
//       balances: new Array([2100, 334]),
//       deepPeople: [[
//         {
//           age: 43,
//           height: 180,
//           id: 2,
//           name: 'Mike',
//           weight: 63
//         },
//         {
//           age: 85,
//           height: 173,
//           id: 1,
//           name: 'John',
//           weight: 70
//         },
//       ]],
//     });
//   });
// });
