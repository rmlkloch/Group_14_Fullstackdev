// backend/scripts/reset.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const resetDatabase = async () => {
  try {
    const connUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/syncboard';
    await mongoose.connect(connUri);
    
    await mongoose.connection.db.dropDatabase();
    console.log('Database reset: All collections and documents cleared successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Database reset failed:', error);
    process.exit(1);
  }
};

resetDatabase();