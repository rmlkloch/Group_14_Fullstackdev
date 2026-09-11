const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Path to your Express app
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

beforeEach(async () => {
  await Task.deleteMany({});
});

describe('Member 3 - Task API Integration Tests', () => {
  it('should create a new task successfully', async () => {
    const newTask = {
      title: 'Test Task for M4',
      status: 'todo',
      priority: 'high'
    };

    const res = await request(app)
      .post('/api/tasks')
      .send(newTask);

    expect(res.statusCode).toBe(201);
    expect(res.body.data.title).toBe('Test Task for M4');
  });

  it('should return 400 when task title is missing', async () => {
    const invalidTask = { status: 'todo' };

    const res = await request(app)
      .post('/api/tasks')
      .send(invalidTask);

    expect(res.statusCode).toBe(400);
  });

  it('should delete an existing task', async () => {
    const task = await Task.create({ title: 'Task to Delete', status: 'todo' });

    const res = await request(app).delete(`/api/tasks/${task._id}`);

    expect(res.statusCode).toBe(200);
    const deletedTask = await Task.findById(task._id);
    expect(deletedTask).toBeNull();
  });
});