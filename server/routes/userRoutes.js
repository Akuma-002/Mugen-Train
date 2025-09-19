const express = require('express');
const router = express.Router();
const { signUp, login } = require('../controllers/userController'); // import your controller

// Signup route
router.post('/signup', signUp);
router.post('/login', login);

// Optional: Get all users
router.get('/', async (req, res) => {
  const userModel = require('../models/user');
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
