
// routes/user.js
const express = require('express');
const userModule = require('../models/user');

const router = express.Router();

// Route to get all users
router.get('/users', (req, res) => {
  const allUsers = userModule.getAllUsers();
  res.json(allUsers);
});

module.exports = router;
