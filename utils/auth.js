const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Assuming you have imported the User model
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Return the newly created user (optional)
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the provided password matches the hashed password in the database
    if (!user.validPassword(password)) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // User is authenticated, you can set the session or token here

    res.status(200).json({ message: 'Authentication successful' });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  // Perform any necessary logout actions, such as clearing sessions or tokens
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;