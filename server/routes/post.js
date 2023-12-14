const express = require("express")
const Post = require("../models/post")
const router = express.Router()

router

.get('/getAllPosts', async (req, res) => {
  try {
    const post = await Post.getAllPosts();
    res.send(post)
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

// login post
.post('/getPost', async (req, res) => {
  try {
    const postsData = await Post.getPosts(req.body)
    res.send({...postsData, message: "Mission Succeeded"})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

// register route
.post('/addPost', async (req, res) => {
  try {
    const newPost = await Post.addPost(req.body)
    res.send({...newPost, message: "Mission Succeeded"})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.put('/edit', async (req, res) => {
  try {
    let postContent = req.body;
    let postData = await Post.editPost(postContent)
    res.send({...postData, message: "Mission Succeeded"})
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
