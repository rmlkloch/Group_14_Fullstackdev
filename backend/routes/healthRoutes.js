// backend/routes/healthRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Map Mongoose connection states to readable strings
const states = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

router.get('/health', (req, res) => {
  const dbStateCode = mongoose.connection.readyState;
  const dbStateString = states[dbStateCode] || 'unknown';
  
  const healthStatus = {
    status: dbStateCode === 1 ? 'UP' : 'DOWN',
    database: {
      provider: 'MongoDB',
      state: dbStateString,
      host: mongoose.connection.host || 'none',
      name: mongoose.connection.name || 'none',
    },
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };

  const statusCode = dbStateCode === 1 ? 200 : 503;
  res.status(statusCode).json(healthStatus);
});

module.exports = router;