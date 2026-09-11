const dotenv = require('dotenv');
const mongoose = require('mongoose');
const dns = require('dns');
const app = require('./app');

// Load environment variables
dotenv.config();

// Custom DNS fallback
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (dnsErr) {
  console.warn('Unable to set custom DNS servers:', dnsErr.message);
}

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/syncboard';

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
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (Database disconnected)`);
    });
  });