// modules/user.js
const con = require("./db_connect");

async function createTable() {
  let sql = `
  CREATE TABLE IF NOT EXISTS User (
    UserId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Username VARCHAR(100) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    CreatedAt DATETIME default(NOW())
  );
    `

      await con.query(sql)
}

createTable()

// CRUD
// Read - Login User 

// Testing out login function
// let newUser = {
//   username: "cathy123",
//   password: "icecream"
// }

// login(newUser);

async function login(user) {
  let userResult = await getUser(user.username)
  if(!userResult[0]) throw Error("Username not found!!")
  if(userResult[0].Password != user.password) throw Error("Password Incorrect!!")

  return userResult[0]
}

// Register (Create) New User
async function register(user) {
  let userResult = await getUser(user.username)
  if(userResult.length > 0) throw Error("Username already in use!!")

  let sql = `
    INSERT INTO USER(FirstName, LastName, Username, Email, Password) 
    VALUES("${user.firstname}", "${user.lastname}", "${user.username}", "${user.email}", "${user.password}");
  `

  await con.query(sql)
  const newUser = await getUser(user.username)
  return newUser[0]
}

// Update - CRUD
async function editUser(user) {
  let updatedUser = await getUser(user.username)
  if(updatedUser.length > 0) throw Error("Username not available!")

  let sql = `UPDATE user
    SET Username = "${user.username}"
    WHERE UserId = ${user.UserId}
  `
  await con.query(sql)
  updatedUser = await getUser(user.username)
  return updatedUser[0]
}

// Delete User 
async function deleteUser(user) {
  let sql = `DELETE FROM user
    WHERE UserId = ${user.UserId}
  `
  await con.query(sql)
}

async function getUsers() {
  let sql = `
    SELECT * FROM user;
  `
  return await con.query(sql)
}

// Useful functions
async function getUser(username) {
  let sql = `
    SELECT * FROM user
    WHERE Username = "${username}" 
  `
  return await con.query(sql)
}

module.exports = {login, register, editUser, deleteUser, getUsers}

  