// backend/scripts/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from backend root
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedDatabase = async () => {
  try {
    const connUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/syncboard';
    await mongoose.connect(connUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing collections if any
    await mongoose.connection.db.dropDatabase();
    console.log('Existing database dropped for clean seed.');

    // Sample data insertion can be expanded when Member 1 models are ready,
    // but the infrastructure seed script structure is now active.
    console.log('Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();