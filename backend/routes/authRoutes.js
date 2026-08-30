const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  getMe,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { loginLimiter } = require('../middleware/rateLimiter');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginLimiter, loginUser);

// Protected routes
router.get('/me', protect, getMe);
router.get('/profile', protect, getUserProfile);

module.exports = router;
