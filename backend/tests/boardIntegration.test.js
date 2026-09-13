const test = require('node:test');
const assert = require('node:assert/strict');
const boardService = require('../services/boardService');
const boardRepository = require('../repositories/boardRepository');
const { protect } = require('../middleware/authMiddleware');

test('Member 2 — Board & Column Integration & API Tests', async (t) => {
  t.beforeEach(() => {
    boardRepository.clear();
  });

  await t.test('createBoard - creates a board successfully', () => {
    const res = boardService.createBoard({
      name: 'Sprint Alpha Board',
      ownerId: 'user_owner_1'
    });

    assert.equal(res.name, 'Sprint Alpha Board');
    assert.equal(res.ownerId, 'user_owner_1');
    assert.equal(res.columns.length, 3);
    assert.equal(res.columns[0].title, 'To Do');
    assert.equal(res.columns[1].title, 'Doing');
    assert.equal(res.columns[2].title, 'Done');
  });

  await t.test('createBoard - rejects creation with missing name', () => {
    assert.throws(
      () => boardService.createBoard({ ownerId: 'user_owner_1' }),
      /Board name is required/
    );
  });

  await t.test('createBoard - rejects creation with missing ownerId', () => {
    assert.throws(
      () => boardService.createBoard({ name: 'Valid Board Name' }),
      /Owner ID is required/
    );
  });

  await t.test('createBoard - rejects board name exceeding 100 chars', () => {
    assert.throws(
      () => boardService.createBoard({ name: 'B'.repeat(101), ownerId: 'user_owner_1' }),
      /Board name cannot exceed 100 characters/
    );
  });

  await t.test('getBoards - retrieves board list', () => {
    boardService.createBoard({ name: 'Board 1', ownerId: 'owner_1' });
    boardService.createBoard({ name: 'Board 2', ownerId: 'owner_2' });

    const res = boardService.getBoards();
    assert.equal(res.totalCount, 2);
    assert.equal(res.data.length, 2);
  });

  await t.test('getBoards - filters boards by ownerId', () => {
    boardService.createBoard({ name: 'Board 1', ownerId: 'owner_1' });
    boardService.createBoard({ name: 'Board 2', ownerId: 'owner_2' });

    const res = boardService.getBoards({ ownerId: 'owner_1' });
    assert.equal(res.totalCount, 1);
    assert.equal(res.data[0].name, 'Board 1');
  });

  await t.test('getBoardById - retrieves single board by ID', () => {
    const created = boardService.createBoard({ name: 'Target Board', ownerId: 'owner_1' });
    const fetched = boardService.getBoardById(created.id);

    assert.equal(fetched.id, created.id);
    assert.equal(fetched.name, 'Target Board');
  });

  await t.test('getBoardById - throws error for missing board ID', () => {
    assert.throws(
      () => boardService.getBoardById(99999),
      /Board not found/
    );
  });

  await t.test('updateBoard - updates board details', () => {
    const created = boardService.createBoard({ name: 'Old Board Name', ownerId: 'owner_1' });
    const updated = boardService.updateBoard(created.id, { name: 'Updated Board Name', description: 'New description' });

    assert.equal(updated.name, 'Updated Board Name');
    assert.equal(updated.description, 'New description');
  });

  await t.test('updateBoard - throws error for empty name', () => {
    const created = boardService.createBoard({ name: 'Valid Board Name', ownerId: 'owner_1' });
    assert.throws(
      () => boardService.updateBoard(created.id, { name: '   ' }),
      /Board name cannot be empty/
    );
  });

  await t.test('deleteBoard - deletes board', () => {
    const created = boardService.createBoard({ name: 'Board to delete', ownerId: 'owner_1' });
    const success = boardService.deleteBoard(created.id);

    assert.equal(success, true);
    assert.throws(
      () => boardService.getBoardById(created.id),
      /Board not found/
    );
  });

  await t.test('addColumn - adds a column', () => {
    const created = boardService.createBoard({ name: 'Column Test Board', ownerId: 'owner_1' });
    const col = boardService.addColumn(created.id, { title: 'Code Review', color: '#a855f7' });

    assert.equal(col.title, 'Code Review');
    assert.equal(col.color, '#a855f7');
  });

  await t.test('addColumn - throws error for empty column title', () => {
    const created = boardService.createBoard({ name: 'Column Test Board', ownerId: 'owner_1' });
    assert.throws(
      () => boardService.addColumn(created.id, { title: '' }),
      /Column title is required/
    );
  });

  await t.test('updateColumn - updates column title', () => {
    const created = boardService.createBoard({ name: 'Update Column Board', ownerId: 'owner_1' });
    const colId = created.columns[0].id;
    const updated = boardService.updateColumn(created.id, colId, { title: 'Upcoming Tasks', color: '#06b6d4' });

    assert.equal(updated.title, 'Upcoming Tasks');
    assert.equal(updated.color, '#06b6d4');
  });

  await t.test('deleteColumn - deletes a column', () => {
    const created = boardService.createBoard({ name: 'Delete Column Board', ownerId: 'owner_1' });
    const colId = created.columns[2].id;
    const success = boardService.deleteColumn(created.id, colId);

    assert.equal(success, true);
  });

  await t.test('deleteColumn - enforces min 1 column rule', () => {
    const created = boardService.createBoard({
      name: 'Single Column Board',
      ownerId: 'owner_1',
      columns: [{ title: 'Lonely Column', color: '#10b981' }]
    });
    const colId = created.columns[0].id;

    assert.throws(
      () => boardService.deleteColumn(created.id, colId),
      /Cannot delete column: Board must have at least one column/
    );
  });

  await t.test('reorderColumns - reorders column positions', () => {
    const created = boardService.createBoard({ name: 'Reorder API Board', ownerId: 'owner_1' });
    const [c1, c2, c3] = created.columns;
    const res = boardService.reorderColumns(created.id, [c3.id, c1.id, c2.id]);

    assert.equal(res[0].id, c3.id);
    assert.equal(res[0].position, 0);
    assert.equal(res[1].id, c1.id);
    assert.equal(res[1].position, 1);
  });

  await t.test('Authorization Middleware - protects routes without valid Bearer token', async () => {
    const dummyReq = { headers: {} };
    const dummyRes = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(payload) {
        this.body = payload;
        return this;
      }
    };

    let nextCalled = false;
    await protect(dummyReq, dummyRes, () => { nextCalled = true; });

    assert.equal(dummyRes.statusCode, 401);
    assert.equal(dummyRes.body.message, 'Not authorized, no token');
    assert.equal(nextCalled, false);
  });
});

