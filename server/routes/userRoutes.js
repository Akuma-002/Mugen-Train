const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { signUp, login, updateUser, cancelBooking} = require('../controllers/userController'); // import your controller

// Signup route
router.post('/signup', signUp);
router.post('/login', login);
router.put('/update/:id', updateUser);
router.put('/:userId/cancel/:ticketNumber', auth, cancelBooking);
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
