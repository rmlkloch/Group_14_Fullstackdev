const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../app');
const boardService = require('../services/boardService');
const boardRepository = require('../repositories/boardRepository');
const { protect } = require('../middleware/authMiddleware');

test('Member 2 — Board & Column Integration & API Tests', async (t) => {
  t.beforeEach(() => {
    boardRepository.clear();
  });

  await t.test('POST /api/boards - creates a board successfully (HTTP 201 Created)', async () => {
    const res = await request(app)
      .post('/api/boards')
      .send({
        name: 'Sprint Alpha Board',
        ownerId: 'user_owner_1'
      })
      .expect('Content-Type', /json/)
      .expect(201);

    assert.equal(res.body.name, 'Sprint Alpha Board');
    assert.equal(res.body.ownerId, 'user_owner_1');
    assert.equal(res.body.columns.length, 3);
    assert.equal(res.body.columns[0].title, 'To Do');
    assert.equal(res.body.columns[1].title, 'Doing');
    assert.equal(res.body.columns[2].title, 'Done');
  });

  await t.test('POST /api/boards - rejects creation with missing name (HTTP 400 Bad Request)', async () => {
    const res = await request(app)
      .post('/api/boards')
      .send({ ownerId: 'user_owner_1' })
      .expect(400);

    assert.equal(res.body.message, 'Board name is required');
  });

  await t.test('POST /api/boards - rejects creation with missing ownerId (HTTP 400 Bad Request)', async () => {
    const res = await request(app)
      .post('/api/boards')
      .send({ name: 'Valid Board Name' })
      .expect(400);

    assert.equal(res.body.message, 'Owner ID is required');
  });

  await t.test('POST /api/boards - rejects board name exceeding 100 chars (HTTP 400 Bad Request)', async () => {
    const res = await request(app)
      .post('/api/boards')
      .send({
        name: 'B'.repeat(101),
        ownerId: 'user_owner_1'
      })
      .expect(400);

    assert.equal(res.body.message, 'Board name cannot exceed 100 characters');
  });

  await t.test('GET /api/boards - retrieves board list (HTTP 200 OK)', async () => {
    boardService.createBoard({ name: 'Board 1', ownerId: 'owner_1' });
    boardService.createBoard({ name: 'Board 2', ownerId: 'owner_2' });

    const res = await request(app)
      .get('/api/boards')
      .expect(200);

    assert.equal(res.body.totalCount, 2);
    assert.equal(res.body.data.length, 2);
  });

  await t.test('GET /api/boards?ownerId=owner_1 - filters boards by ownerId (HTTP 200 OK)', async () => {
    boardService.createBoard({ name: 'Board 1', ownerId: 'owner_1' });
    boardService.createBoard({ name: 'Board 2', ownerId: 'owner_2' });

    const res = await request(app)
      .get('/api/boards?ownerId=owner_1')
      .expect(200);

    assert.equal(res.body.totalCount, 1);
    assert.equal(res.body.data[0].name, 'Board 1');
  });

  await t.test('GET /api/boards/:id - retrieves single board by ID (HTTP 200 OK)', async () => {
    const created = boardService.createBoard({ name: 'Target Board', ownerId: 'owner_1' });

    const res = await request(app)
      .get(`/api/boards/${created.id}`)
      .expect(200);

    assert.equal(res.body.id, created.id);
    assert.equal(res.body.name, 'Target Board');
  });

  await t.test('GET /api/boards/:id - returns 404 Not Found for missing board ID', async () => {
    const res = await request(app)
      .get('/api/boards/99999')
      .expect(404);

    assert.equal(res.body.message, 'Board not found');
  });

  await t.test('PATCH /api/boards/:id - updates board details (HTTP 200 OK)', async () => {
    const created = boardService.createBoard({ name: 'Old Board Name', ownerId: 'owner_1' });

    const res = await request(app)
      .patch(`/api/boards/${created.id}`)
      .send({ name: 'Updated Board Name', description: 'New description' })
      .expect(200);

    assert.equal(res.body.name, 'Updated Board Name');
    assert.equal(res.body.description, 'New description');
  });

  await t.test('PATCH /api/boards/:id - returns 400 Bad Request for empty name', async () => {
    const created = boardService.createBoard({ name: 'Valid Board Name', ownerId: 'owner_1' });

    const res = await request(app)
      .patch(`/api/boards/${created.id}`)
      .send({ name: '   ' })
      .expect(400);

    assert.equal(res.body.message, 'Board name cannot be empty');
  });

  await t.test('DELETE /api/boards/:id - deletes board (HTTP 200 OK)', async () => {
    const created = boardService.createBoard({ name: 'Board to delete', ownerId: 'owner_1' });

    const res = await request(app)
      .delete(`/api/boards/${created.id}`)
      .expect(200);

    assert.equal(res.body.message, 'Board deleted successfully');

    await request(app)
      .get(`/api/boards/${created.id}`)
      .expect(404);
  });

  await t.test('POST /api/boards/:id/columns - adds a column (HTTP 201 Created)', async () => {
    const created = boardService.createBoard({ name: 'Column Test Board', ownerId: 'owner_1' });

    const res = await request(app)
      .post(`/api/boards/${created.id}/columns`)
      .send({ title: 'Code Review', color: '#a855f7' })
      .expect(201);

    assert.equal(res.body.title, 'Code Review');
    assert.equal(res.body.color, '#a855f7');
  });

  await t.test('POST /api/boards/:id/columns - returns 400 for empty column title', async () => {
    const created = boardService.createBoard({ name: 'Column Test Board', ownerId: 'owner_1' });

    const res = await request(app)
      .post(`/api/boards/${created.id}/columns`)
      .send({ title: '' })
      .expect(400);

    assert.equal(res.body.message, 'Column title is required');
  });

  await t.test('PATCH /api/boards/:id/columns/:columnId - updates column title (HTTP 200 OK)', async () => {
    const created = boardService.createBoard({ name: 'Update Column Board', ownerId: 'owner_1' });
    const colId = created.columns[0].id;

    const res = await request(app)
      .patch(`/api/boards/${created.id}/columns/${colId}`)
      .send({ title: 'Upcoming Tasks', color: '#06b6d4' })
      .expect(200);

    assert.equal(res.body.title, 'Upcoming Tasks');
    assert.equal(res.body.color, '#06b6d4');
  });

  await t.test('DELETE /api/boards/:id/columns/:columnId - deletes a column (HTTP 200 OK)', async () => {
    const created = boardService.createBoard({ name: 'Delete Column Board', ownerId: 'owner_1' });
    const colId = created.columns[2].id;

    const res = await request(app)
      .delete(`/api/boards/${created.id}/columns/${colId}`)
      .expect(200);

    assert.equal(res.body.message, 'Column deleted successfully');
  });

  await t.test('DELETE /api/boards/:id/columns/:columnId - enforces min 1 column rule (HTTP 400 Bad Request)', async () => {
    const created = boardService.createBoard({
      name: 'Single Column Board',
      ownerId: 'owner_1',
      columns: [{ title: 'Lonely Column', color: '#10b981' }]
    });
    const colId = created.columns[0].id;

    const res = await request(app)
      .delete(`/api/boards/${created.id}/columns/${colId}`)
      .expect(400);

    assert.equal(res.body.message, 'Cannot delete column: Board must have at least one column');
  });

  await t.test('PUT /api/boards/:id/columns/reorder - reorders column positions (HTTP 200 OK)', async () => {
    const created = boardService.createBoard({ name: 'Reorder API Board', ownerId: 'owner_1' });
    const [c1, c2, c3] = created.columns;

    const res = await request(app)
      .put(`/api/boards/${created.id}/columns/reorder`)
      .send({ columnOrderIds: [c3.id, c1.id, c2.id] })
      .expect(200);

    assert.equal(res.body[0].id, c3.id);
    assert.equal(res.body[0].position, 0);
    assert.equal(res.body[1].id, c1.id);
    assert.equal(res.body[1].position, 1);
  });

  await t.test('Authorization Middleware - protects routes without valid Bearer token (HTTP 401 Unauthorized)', async () => {
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
