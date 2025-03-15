// /backend/express-server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ username, email, password, userType });
    await user.save();

    return res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET || 'mysecretkey',
      { expiresIn: '1h' }
    );

    return res.json({
      token,
      userType: user.userType,
      userId: user._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});
// In your Node/Express backend (e.g., in routes/authRoutes.js)
const express = require('express');
const router = express.Router();

// Example authentication middleware that populates req.user
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Not logged in" });
};

router.get('/me', ensureAuthenticated, (req, res) => {
  // Assuming req.user has been set by your authentication middleware
  res.json({
    _id: req.user._id,
    email: req.user.email,
    // ... any other fields you need
  });
});

module.exports = router;

module.exports = router;
