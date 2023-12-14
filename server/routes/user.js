const express = require("express")
const User = require("../models/user")
const router = express.Router()

router

.get('/getAllUsers', async (req, res) => {
  try {
    const users = await User.getUsers();
    res.send(users)
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

// login post
.post('/login', async (req, res) => {
  try {
    const user = await User.login(req.body)
    res.send({...user, Password: undefined})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

// register route
.post('/register', async (req, res) => {
  try {
    const user = await User.register(req.body)
    res.send({...user, Password: undefined})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.put('/edit', async (req, res) => {
  try {
    let user = await User.editUser(req.body)
    res.send({...user, Password: undefined})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.delete('/delete', async (req, res) => {
  try {
    await User.deleteUser(req.body)
    res.send({success: "User deleted successfully"})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

module.exports = router;
