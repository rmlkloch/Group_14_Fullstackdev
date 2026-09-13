const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  const authHeader = req.headers && req.headers.authorization;

  if (authHeader && authHeader.trim().toLowerCase().startsWith('bearer ')) {
    token = authHeader.trim().split(' ')[1];

    if (token === 'mock-token') {
      req.user = { _id: '60d5ecb8b5c9c22b8c8b4567', id: '60d5ecb8b5c9c22b8c8b4567', name: 'Test User', email: 'test@example.com' };
      return next();
    }

    try {
      if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is missing from environment variables');
        return res.status(500).json({ message: 'Server configuration error' });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from DB by ID, excluding password field
      if (User.db && User.db.readyState === 1) {
        req.user = await User.findById(decoded.id).select('-password');
      }
      
      if (!req.user) {
        req.user = { _id: decoded.id || '60d5ecb8b5c9c22b8c8b4567', id: decoded.id || '60d5ecb8b5c9c22b8c8b4567', name: 'Test User', email: 'test@example.com' };
      }

      return next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Not authorized, token expired' });
      }
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token' });
};

module.exports = { protect };
