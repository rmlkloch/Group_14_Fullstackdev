const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const dns = require('dns');

// Load environment variables from .env file
dotenv.config();

// Custom DNS fallback: Resolves querySrv ECONNREFUSED issues caused by ISP DNS resolvers
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (dnsErr) {
  console.warn('Unable to set custom DNS servers:', dnsErr.message);
}

const authRoutes = require('./routes/authRoutes');

const app = express();

// Body parser middleware
app.use(express.json());

// Mount auth routes (includes /register, /login, and protected /profile)
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/syncboard';

// Connection options to handle server selection timeout and prevent long hangs
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
};

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI, mongooseOptions)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message || err);
    if (err.code === 'ECONNREFUSED' || (err.message && err.message.includes('querySrv'))) {
      console.error('DNS SRV Resolution Notice: ISP/DNS resolver failed to resolve SRV records.');
    }
    // Start server even if MongoDB connection fails initially so routes can be inspected
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (Database disconnected)`);
    });
  });
