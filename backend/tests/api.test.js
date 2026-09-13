const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const generateToken = require('../utils/generateToken');

const User = require('../models/User');

jest.setTimeout(60000);

let mongoServer;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  const user = await User.create({
    name: 'Test Member',
    email: 'api_test_user@example.com',
    password: 'password123',
    role: 'member',
  });
  token = generateToken(user._id);
});


afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Member 5 - Validation & Concurrency Tests', () => {
  it('should return 400 for invalid ObjectId format', async () => {
    const res = await request(app)
      .get('/api/tasks/invalid-id-format')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Invalid task ID format|invalid/i);
  });

  it('should return 401 when no authorization token is provided', async () => {
    const res = await request(app).get('/api/tasks/60d5ecb8b5c9c22b8c8b4567');
    expect(res.statusCode).toBe(401);
  });
});