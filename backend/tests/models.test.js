const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { User, Board, Task, Activity } = require('../models');

test('User Model Schema Validation', async (t) => {
  await t.test('validates required fields', async () => {
    const user = new User({});
    let err;
    try {
      await user.validate();
    } catch (e) {
      err = e;
    }
    assert.ok(err.errors.name, 'name should be required');
    assert.ok(err.errors.email, 'email should be required');
    assert.ok(err.errors.password, 'password should be required');
  });

  await t.test('rejects invalid email formats', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'not-an-email',
      password: 'password123',
    });
    let err;
    try {
      await user.validate();
    } catch (e) {
      err = e;
    }
    assert.ok(err.errors.email, 'invalid email format should be rejected');
  });

  await t.test('sets default role to member and enforces role enums', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });
    assert.equal(user.role, 'member');

    user.role = 'invalid_role';
    let err;
    try {
      await user.validate();
    } catch (e) {
      err = e;
    }
    assert.ok(err.errors.role, 'invalid role should be rejected');
  });

  await t.test('transforms _id to id and excludes password in toJSON', () => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'secretpassword',
    });

    const json = user.toJSON();
    assert.ok(json.id, 'json output should have id property');
    assert.equal(json._id, undefined, 'json output should omit _id');
    assert.equal(json.password, undefined, 'json output should omit password');
  });
});

test('Board Model Schema Validation', async (t) => {
  const dummyOwnerId = new mongoose.Types.ObjectId();

  await t.test('validates required board name and ownerId', async () => {
    const board = new Board({});
    let err;
    try {
      await board.validate();
    } catch (e) {
      err = e;
    }
    assert.ok(err.errors.name, 'name should be required');
    assert.ok(err.errors.ownerId, 'ownerId should be required');
  });

  await t.test('embeds default columns (To Do, Doing, Done)', () => {
    const board = new Board({
      name: 'Agile Project',
      ownerId: dummyOwnerId,
    });
    assert.equal(board.columns.length, 3);
    assert.equal(board.columns[0].title, 'To Do');
    assert.equal(board.columns[1].title, 'Doing');
    assert.equal(board.columns[2].title, 'Done');
  });

  await t.test('transforms board and embedded column _id to id in toJSON', () => {
    const board = new Board({
      _id: new mongoose.Types.ObjectId(),
      name: 'Sprint Board',
      ownerId: dummyOwnerId,
    });

    const json = board.toJSON();
    assert.ok(json.id, 'board json should have id');
    assert.equal(json._id, undefined);
    assert.ok(json.columns[0].id, 'embedded column json should have id');
    assert.equal(json.columns[0]._id, undefined);
  });
});

test('Task Model Schema Validation', async (t) => {
  const dummyBoardId = new mongoose.Types.ObjectId();

  await t.test('validates required fields (title, status, boardId)', async () => {
    const task = new Task({});
    let err;
    try {
      await task.validate();
    } catch (e) {
      err = e;
    }
    assert.ok(err.errors.title, 'title should be required');
    assert.ok(err.errors.boardId, 'boardId should be required');
  });

  await t.test('enforces status and priority enums', async () => {
    const task = new Task({
      title: 'Fix Bug',
      boardId: dummyBoardId,
      status: 'InvalidStatus',
      priority: 'InvalidPriority',
    });
    let err;
    try {
      await task.validate();
    } catch (e) {
      err = e;
    }
    assert.ok(err.errors.status, 'invalid status should be rejected');
    assert.ok(err.errors.priority, 'invalid priority should be rejected');
  });

  await t.test('initializes optimistic concurrency version to 1', () => {
    const task = new Task({
      title: 'Setup Database',
      boardId: dummyBoardId,
    });
    assert.equal(task.version, 1, 'task version should default to 1');
  });

  await t.test('transforms _id to id in toJSON', () => {
    const task = new Task({
      _id: new mongoose.Types.ObjectId(),
      title: 'Design Schema',
      boardId: dummyBoardId,
    });

    const json = task.toJSON();
    assert.ok(json.id, 'json should have id property');
    assert.equal(json._id, undefined);
  });
});

test('Activity Model Schema Validation', async (t) => {
  const dummyBoardId = new mongoose.Types.ObjectId();
  const dummyUserId = new mongoose.Types.ObjectId();

  await t.test('validates required fields (boardId, userId, action)', async () => {
    const activity = new Activity({});
    let err;
    try {
      await activity.validate();
    } catch (e) {
      err = e;
    }
    assert.ok(err.errors.boardId, 'boardId should be required');
    assert.ok(err.errors.userId, 'userId should be required');
    assert.ok(err.errors.action, 'action should be required');
  });

  await t.test('enforces valid activity action enum', async () => {
    const activity = new Activity({
      boardId: dummyBoardId,
      userId: dummyUserId,
      action: 'INVALID_ACTION',
    });
    let err;
    try {
      await activity.validate();
    } catch (e) {
      err = e;
    }
    assert.ok(err.errors.action, 'invalid action should be rejected');
  });

  await t.test('accepts valid activity actions and details', async () => {
    const activity = new Activity({
      boardId: dummyBoardId,
      userId: dummyUserId,
      action: 'MOVED_TASK',
      details: { fromColumn: 'To Do', toColumn: 'Doing' },
    });
    let err;
    try {
      await activity.validate();
    } catch (e) {
      err = e;
    }
    assert.equal(err, undefined, 'valid activity should pass validation');
    assert.equal(activity.action, 'MOVED_TASK');
  });
});
