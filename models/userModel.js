'use strict';
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@metropolia.fi',
    password: '1234',
  },
  {
    id: '2',
    name: 'Jane Doez',
    email: 'jane@metropolia.fi',
    password: 'qwer',
  },
];


const getUser = (userId) => {
  return users.filter(users => users.id === userId);
}

module.exports = {
  getUser,
  users,
};