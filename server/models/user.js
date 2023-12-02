// modules/user.js
const users = [
    { id: 1, name: 'Sravani Pamarthi', email: 'sravani@example.com' },
    { id: 2, name: 'Priyal', email: 'priyal@example.com' },
    { id: 3, name: 'Abhinav', email: 'abhinav@example.com' }
  ];
  
  function getAllUsers() {
    return users;
  }
  
  module.exports = {
    getAllUsers
  };
  