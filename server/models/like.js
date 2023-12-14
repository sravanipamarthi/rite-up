// modules/like.js
const con = require("./db_connect");

async function createTable() {
  let sql = `
  CREATE TABLE IF NOT EXISTS Likes (
    LikeId BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    UserId INT,
    PostId INT,
    CreatedAt DATETIME default(NOW()),
    FOREIGN KEY(UserId) REFERENCES User(UserId),
    FOREIGN KEY(PostId) REFERENCES Post(PostId)
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
async function addLike(userId, postId) {
  try {
    // Check if the user has already liked the post
    const existingLike = await this.getLike(userId, postId);
    if (existingLike.likeCount > 0) {
      throw new Error('User has already liked this post.');
    }

    // Insert the new like
    const sql = `
      INSERT INTO Likes(UserId, PostId)
      VALUES (?, ?)
    `;
    const values = [userId, postId];
    await con.query(sql, values);

    return { success: true, message: 'Like added successfully.' };
  } catch (error) {
    throw new Error(error.message);
  }
}


// Update - CRUD
async function removeLike(userId, postId) {
  try {
    // Check if the user has liked the post
    const existingLike = await this.getLike(userId, postId);
    if (!existingLike) {
      throw new Error('User has not liked this post.');
    }

    // Delete the like
    const sql = `
      DELETE FROM Likes
      WHERE UserId = ? AND PostId = ?
    `;
    const values = [userId, postId];
    await con.query(sql, values);

    return { success: true, message: 'Like removed successfully.' };
  } catch (error) {
    throw new Error(error.message);
  }
}

// Delete Like
async function getLike(userId, postId) {
  try {
    const sql = `
      SELECT COUNT(*) AS LikeCount FROM Likes
      WHERE UserId = ? AND PostId = ?
    `;
    const values = [userId, postId];
    const result = await con.query(sql, values);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getLikesForPost(postId) {
  try {
    const sql = `
      SELECT COUNT(*) as likeCount FROM Likes
      WHERE PostId = ?
    `;
    const values = [postId];
    const result = await con.query(sql, values);

    return result.length > 0 ? result[0].likeCount : 0;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {addLike, removeLike, getLike, getLikesForPost}