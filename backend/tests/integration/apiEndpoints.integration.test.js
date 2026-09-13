const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Ensure process.env.NODE_ENV is set to 'test'
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret123';

const app = require('../../server');
const dbHandler = require('../setup/dbHandler');
const Task = require('../../models/Task');
const User = require('../../models/User');

describe('API Endpoints Integration Tests (GET /api/tasks)', () => {
  let token;
  let testUser;
  const mockBoardId = new mongoose.Types.ObjectId();

  beforeAll(async () => {
    await dbHandler.connect();
  });

  afterEach(async () => {
    await dbHandler.clearDatabase();
  });

  afterAll(async () => {
    await dbHandler.closeDatabase();
  });

  beforeEach(async () => {
    // 1. Seed test user and generate JWT token
    testUser = await User.create({
      name: 'Integration Test User',
      email: 'testuser@example.com',
      password: 'password123',
    });

    token = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // 2. Seed 6 mock tasks across different statuses, assignees, and creation dates
    const now = Date.now();

    await Task.create([
      {
        title: 'Task 1 - Oldest',
        status: 'To Do',
        priority: 'Low',
        boardId: mockBoardId,
        assignee: testUser._id,
        createdAt: new Date(now - 50000),
      },
      {
        title: 'Task 2 - Middle',
        status: 'Doing',
        priority: 'Medium',
        boardId: mockBoardId,
        assignee: testUser._id,
        createdAt: new Date(now - 40000),
      },
      {
        title: 'Task 3 - Completed 1',
        status: 'Done',
        priority: 'High',
        boardId: mockBoardId,
        assignee: testUser._id,
        createdAt: new Date(now - 30000),
      },
      {
        title: 'Task 4 - Completed 2',
        status: 'Done',
        priority: 'Low',
        boardId: mockBoardId,
        assignee: testUser._id,
        createdAt: new Date(now - 20000),
      },
      {
        title: 'Task 5 - In Progress',
        status: 'Doing',
        priority: 'High',
        boardId: mockBoardId,
        assignee: testUser._id,
        createdAt: new Date(now - 10000),
      },
      {
        title: 'Task 6 - Newest',
        status: 'To Do',
        priority: 'Medium',
        boardId: mockBoardId,
        assignee: testUser._id,
        createdAt: new Date(now),
      },
    ]);
  });

  describe('GET /api/tasks - Pagination', () => {
    test('returns 200 OK status, exactly 2 tasks, and correct pagination metadata for page=1&limit=2', async () => {
      const response = await request(app)
        .get('/api/tasks?page=1&limit=2')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('tasks');
      expect(Array.isArray(response.body.tasks)).toBe(true);
      expect(response.body.tasks.length).toBe(2);
      expect(response.body.totalTasks).toBe(6);
      expect(response.body.totalPages).toBe(3);
      expect(response.body.currentPage).toBe(1);
    });
  });

  describe('GET /api/tasks - Filtering', () => {
    test('returns 200 OK status and only tasks matching status=Done', async () => {
      const response = await request(app)
        .get('/api/tasks?status=Done')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.tasks)).toBe(true);
      expect(response.body.tasks.length).toBe(2);
      response.body.tasks.forEach((task) => {
        expect(task.status).toBe('Done');
      });
    });
  });

  describe('GET /api/tasks - Sorting', () => {
    test('returns 200 OK status and tasks in ascending chronological order of createdAt', async () => {
      const response = await request(app)
        .get('/api/tasks?sortBy=createdAt&order=asc&limit=10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      const tasks = response.body.tasks;
      expect(tasks.length).toBe(6);

      for (let i = 0; i < tasks.length - 1; i++) {
        const currentDate = new Date(tasks[i].createdAt).getTime();
        const nextDate = new Date(tasks[i + 1].createdAt).getTime();
        expect(currentDate).toBeLessThanOrEqual(nextDate);
      }
    });
  });

  describe('GET /api/tasks - Validation & Errors', () => {
    test('returns 400 Bad Request status code for invalid limit parameter (e.g. limit=-5)', async () => {
      const response = await request(app)
        .get('/api/tasks?limit=-5')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });

    test('returns 400 Bad Request status code for non-numeric page parameter (e.g. page=abc)', async () => {
      const response = await request(app)
        .get('/api/tasks?page=abc')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
  });
});
