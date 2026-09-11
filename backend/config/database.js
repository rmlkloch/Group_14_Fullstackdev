// backend/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Attempt to connect to the database using the environment variable
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // Handle connection success
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    // Handle connection failure on startup
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process with failure if DB cannot connect
  }
};

// Handle database disconnection during runtime
mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected. Check your database server.');
});

// Handle runtime errors after initial connection
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB runtime error: ${err.message}`);
});

module.exports = connectDB;