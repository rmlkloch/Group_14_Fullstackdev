const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const boardController = require('../controllers/boardController');
const Board = require('../models/Board');
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

test('boardController - ObjectId validation', async (t) => {
  await t.test('getBoardById returns 400 for invalid ObjectId', async () => {
    const req = { params: { id: 'invalid-id' } };
    const res = createMockRes();

    await boardController.getBoardById(req, res);

    assert.equal(res.statusCode, 400);
    assert.equal(res.body.message, 'Invalid board ID format');
  });

  await t.test('updateBoard returns 400 for invalid ObjectId', async () => {
    const req = { params: { id: 'invalid-id' }, body: {} };
    const res = createMockRes();

    await boardController.updateBoard(req, res);

    assert.equal(res.statusCode, 400);
    assert.equal(res.body.message, 'Invalid board ID format');
  });

  await t.test('deleteBoard returns 400 for invalid ObjectId', async () => {
    const req = { params: { id: 'invalid-id' } };
    const res = createMockRes();

    await boardController.deleteBoard(req, res);

    assert.equal(res.statusCode, 400);
    assert.equal(res.body.message, 'Invalid board ID format');
  });

  await t.test('addColumn returns 400 for invalid ObjectId', async () => {
    const req = { params: { id: 'invalid-id' }, body: { title: 'New Column' } };
    const res = createMockRes();

    await boardController.addColumn(req, res);

    assert.equal(res.statusCode, 400);
    assert.equal(res.body.message, 'Invalid board ID format');
  });

  await t.test('updateColumn returns 400 for invalid column ObjectId', async () => {
    const validBoardId = new mongoose.Types.ObjectId().toString();
    const req = { params: { id: validBoardId, columnId: 'bad-column-id' }, body: { title: 'Updated' } };
    const res = createMockRes();

    await boardController.updateColumn(req, res);

    assert.equal(res.statusCode, 400);
    assert.equal(res.body.message, 'Invalid board or column ID format');
  });

  await t.test('deleteColumn returns 400 for invalid column ObjectId', async () => {
    const validBoardId = new mongoose.Types.ObjectId().toString();
    const req = { params: { id: validBoardId, columnId: 'bad-column-id' } };
    const res = createMockRes();

    await boardController.deleteColumn(req, res);

    assert.equal(res.statusCode, 400);
    assert.equal(res.body.message, 'Invalid board or column ID format');
  });

  await t.test('getBoardAnalytics returns 400 for invalid board ObjectId', async () => {
    const req = { params: { id: 'invalid-board-id' } };
    const res = createMockRes();

    await boardController.getBoardAnalytics(req, res);

    assert.equal(res.statusCode, 400);
    assert.equal(res.body.message, 'Invalid board ID format');
  });
});

test('boardController - getBoardAnalytics aggregation output', async (t) => {
  await t.test('computes aggregation metrics using $facet', async () => {
    const validBoardId = new mongoose.Types.ObjectId().toString();
    const req = { params: { id: validBoardId } };
    const res = createMockRes();

    const originalFindById = Board.findById;
    const originalAggregate = Task.aggregate;

    Board.findById = async () => ({ name: 'Test Sprint Board' });
    Task.aggregate = async () => [
      {
        taskCounts: [{ total: 5 }],
        tasksByStatus: [
          { status: 'To Do', count: 2 },
          { status: 'Doing', count: 2 },
          { status: 'Done', count: 1 },
        ],
        tasksByAssignee: [
          { assigneeId: 'user1', count: 3, user: { name: 'User 1' } },
        ],
        overdueTasks: [
          { id: 'task1', title: 'Overdue Task 1', dueDate: new Date('2025-01-01') },
        ],
      },
    ];

    await boardController.getBoardAnalytics(req, res);

    Board.findById = originalFindById;
    Task.aggregate = originalAggregate;

    assert.equal(res.statusCode, 200);
    assert.equal(res.body.boardId, validBoardId);
    assert.equal(res.body.totalTasks, 5);
    assert.equal(res.body.tasksByStatus.length, 3);
    assert.equal(res.body.overdueTasks.count, 1);
  });
});
