// backend/tests/auth.test.js
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const app = require('../server');

jest.setTimeout(30000); // Increase timeout for slow database starts

let mongoServer;

// Setup: Start in-memory database
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  await mongoose.connect(mongoUri);
});
// ... rest of the file remains exactly the same ...

// Teardown: Stop database
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Isolation: Clear all data before every individual test
beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

describe('Member 1 - Authentication API Tests', () => {
  const testUser = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'Password123!'
  };

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('email', testUser.email);
    });

    it('should reject registration with a duplicate email', async () => {
      // 1. Register the user for the first time
      await request(app).post('/api/auth/register').send(testUser);
      
      // 2. Attempt to register again with the exact same data
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('POST /api/auth/login', () => {
    // Pre-register a user before each login test runs
    beforeEach(async () => {
      await request(app).post('/api/auth/register').send(testUser);
    });

    it('should login successfully with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('email', testUser.email);
    });

    it('should reject login with an incorrect password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'WrongPassword123'
        });

      // Assert that the API correctly rejects invalid access
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message');
    });
  });
});