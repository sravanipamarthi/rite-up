const express = require("express")
const Like = require("../models/like")
const router = express.Router()

// Add Like
router

.post('/add', async (req, res) => {
    try {
        const { userId, postId } = req.body;
        const result = await Like.addLike(userId, postId);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

// Remove Like
.delete('/remove', async (req, res) => {
    try {
        const { userId, postId } = req.body;
        const result = await Like.removeLike(userId, postId);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

// Get Like
.get('/get', async (req, res) => {
    try {
        const { userId, postId } = req.query;
        // console.log("Query: " + userId + ", " + postId)
        const result = await Like.getLike(userId, postId);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

// Get Likes for Post
.get('/getLikesForPost', async (req, res) => {
    try {
        const postId = req.query.postId;
        const result = await Like.getLikesForPost(postId);
        res.send({ likeCount: result });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;