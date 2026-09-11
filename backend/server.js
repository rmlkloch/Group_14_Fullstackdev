const dotenv = require('dotenv');
const dns = require('dns');
const connectDB = require('./config/database');
const app = require('./app');

// Load environment variables
dotenv.config();

// Custom DNS fallback
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (dnsErr) {
  console.warn('Unable to set custom DNS servers:', dnsErr.message);
}

// Initialize database connection (Skip during tests to allow in-memory DB)
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

const PORT = process.env.PORT || 5000;

// Only listen to the port if we are NOT running Jest tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app for Supertest
module.exports = app;