// modules/user.js
const con = require("./db_connect");

async function createTable() {
  let sql = `
 CREATE TABLE IF NOT EXISTS Post (
  PostId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Content LONGTEXT NOT NULL,
  UserId INT,
  CreatedAt DATETIME default(NOW()),
  FOREIGN KEY(UserId) REFERENCES User(UserId)
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

// Register (Create) New User
async function addPost(post) {
  let userResult = await getUser(post.userId)
  if(userResult.length == 0) throw Error("User does not exist!")

  let sql = `
  INSERT INTO POST(Content, UserId) 
  VALUES("${post.content}", "${post.userId}");
  `

  await con.query(sql)
  return post;
}


// Update - CRUD
async function editPost(post) {
  let updatedPost = await getPost(post.postId)
  if(updatedPost.length == 0) throw Error("Post not available!")

  let sql = `UPDATE post
    SET Content = "${post.content}"
    WHERE PostId = ${post.PostId};
  `
  await con.query(sql)
  updatedPost = await getPost(post.PostId)
  return updatedPost[0]
}

// Delete User 
async function deletePost(post) {
  let sql = `DELETE FROM post
    WHERE PostId = ${post.PostId}
  `
  await con.query(sql)
}

async function getAllPosts() {
  let sql = `
    SELECT p.PostId, p.Content, p.UserId, u.Username FROM post p
    join user u on u.UserId=p.UserId
    ORDER BY p.CreatedAt DESC;
  `
  return await con.query(sql)
}

// Useful functions
async function getPosts(username) {
  let updatedPost = await getUser(username)
  if(updatedPost.length == 0) throw Error("Username: '" + toString(username) + "' does not exit!")

  let sql = `
    SELECT p.content, u.username FROM post p
    join user u on u.UserId=p.UserId
    WHERE u.Username = "${username}"
    `
  return await con.query(sql)
}

// Useful functions
async function getUser(username) {
  let sql = `
    SELECT * FROM user
    WHERE Username = "${username}" or UserId = "${username}" 
  `
  return await con.query(sql)
}

async function getPost(postId) {
  let sql = `
    SELECT p.content, u.username FROM post p
    join user u on u.UserId=p.UserId
    WHERE p.PostId = "${PostId}"
    `
  return await con.query(sql)
}

module.exports = {addPost, getAllPosts, editPost, deletePost, getPosts}

  