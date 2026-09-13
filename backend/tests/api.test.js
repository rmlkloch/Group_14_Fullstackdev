const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const Task = require('../models/Task');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Member 5 - Validation & Concurrency Tests', () => {
  it('should return 400 for invalid ObjectId format', async () => {
    const res = await request(app)
      .get('/api/tasks/invalid-id-format')
      .set('Authorization', 'Bearer mock-token');
      
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid ID Format');
  });

  it('should detect version conflicts and return 409 Conflict', async () => {
    const task = await Task.create({
      title: 'Original Title',
      status: 'todo',
      boardId: new mongoose.Types.ObjectId(),
      version: 1
    });

    const res = await request(app)
      .put(`/api/tasks/${task._id}`)
      .set('Authorization', 'Bearer mock-token')
      .send({ title: 'Updated Title', baseVersion: -1 });

    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe('Conflict');
    expect(res.body).toHaveProperty('currentTask');
  });
});