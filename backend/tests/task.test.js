const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const Task = require('../models/Task');
const User = require('../models/User');
const Board = require('../models/Board');
const generateToken = require('../utils/generateToken');

let mongoServer;
let token;
let user;
let board;

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
  await User.deleteMany({});
  await Board.deleteMany({});

  user = await User.create({
    name: 'Test Member',
    email: 'member@example.com',
    password: 'password123',
    role: 'member',
  });

  token = generateToken(user._id);

  board = await Board.create({
    name: 'Test Board',
    ownerId: user._id,
  });
});

describe('Member 3 - Task API Integration Tests', () => {
  it('should create a new task successfully', async () => {
    const newTask = {
      title: 'Test Task for M4',
      status: 'To Do',
      priority: 'High',
      boardId: board._id,
    };

    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(newTask);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Task for M4');
  });

  it('should return 400 when task title is missing', async () => {
    const invalidTask = { status: 'To Do', boardId: board._id };

    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidTask);

    expect(res.statusCode).toBe(400);
  });

  it('should delete an existing task', async () => {
    const task = await Task.create({
      title: 'Task to Delete',
      status: 'To Do',
      boardId: board._id,
    });

    const res = await request(app)
      .delete(`/api/tasks/${task._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    const deletedTask = await Task.findById(task._id);
    expect(deletedTask).toBeNull();
  });
});