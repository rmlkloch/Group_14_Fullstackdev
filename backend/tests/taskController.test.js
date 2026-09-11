const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const taskController = require('../controllers/taskController');
const Task = require('../models/Task');

// Helper to create mock res object
function createMockRes() {
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  return res;
}

test('taskController - getTasks', async (t) => {
  await t.test('handles getTasks response structure', async () => {
    const req = {
      query: { page: '1', limit: '5' },
    };
    const res = createMockRes();

    // Mock Task.countDocuments and Task.find
    const originalCount = Task.countDocuments;
    const originalFind = Task.find;

    Task.countDocuments = async () => 2;
    Task.find = () => {
      const mockQuery = {
        sort() { return this; },
        skip() { return this; },
        limit() { return this; },
        select() { return this; },
        then(resolve) { resolve([{ title: 'Task 1' }, { title: 'Task 2' }]); },
      };
      return mockQuery;
    };

    await taskController.getTasks(req, res);

    // Restore
    Task.countDocuments = originalCount;
    Task.find = originalFind;

    assert.equal(res.statusCode, 200);
    assert.equal(res.body.totalTasks, 2);
    assert.equal(res.body.currentPage, 1);
    assert.equal(res.body.tasks.length, 2);
  });
});

test('taskController - getTaskById', async (t) => {
  await t.test('returns 400 for invalid ObjectId format', async () => {
    const req = { params: { id: 'invalid-id' } };
    const res = createMockRes();

    await taskController.getTaskById(req, res);

    assert.equal(res.statusCode, 400);
    assert.equal(res.body.message, 'Invalid task ID format');
  });

  await t.test('returns 404 if task is not found', async () => {
    const validId = new mongoose.Types.ObjectId().toString();
    const req = { params: { id: validId } };
    const res = createMockRes();

    const originalFindById = Task.findById;
    Task.findById = async () => null;

    await taskController.getTaskById(req, res);

    Task.findById = originalFindById;

    assert.equal(res.statusCode, 404);
    assert.equal(res.body.message, 'Task not found');
  });
});

test('taskController - updateTask & deleteTask ObjectId validation', async (t) => {
  await t.test('updateTask returns 400 for invalid ObjectId', async () => {
    const req = { params: { id: 'bad-id' }, body: {} };
    const res = createMockRes();

    await taskController.updateTask(req, res);
    assert.equal(res.statusCode, 400);
    assert.equal(res.body.message, 'Invalid task ID format');
  });

  await t.test('deleteTask returns 400 for invalid ObjectId', async () => {
    const req = { params: { id: 'bad-id' } };
    const res = createMockRes();

    await taskController.deleteTask(req, res);
    assert.equal(res.statusCode, 400);
    assert.equal(res.body.message, 'Invalid task ID format');
  });
});
