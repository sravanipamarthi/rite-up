const express = require("express")
const Post = require("../models/post")
const router = express.Router()

router

.get('/getAllPosts', async (req, res) => {
  try {
    const post = await Post.getPosts();
    res.send(Posts)
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

// login post
.post('/getPost', async (req, res) => {
  try {
    const Post = await Post.getPosts(req.body)
    res.send({...Post, message: "Mission Succeeded"})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

// register route
.post('/addPost', async (req, res) => {
  try {
    const Post = await Post.addPost(req.body)
    res.send({...Post, message: "Mission Succeeded"})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.put('/edit', async (req, res) => {
  try {
    let Post = await Post.editPost(req.body)
    res.send({...Post, message: "Mission Succeeded"})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.delete('/delete', async (req, res) => {
  try {
    await Post.deletePost(req.body)
    res.send({success: "Post deleted successfully"})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

module.exports = router;
