const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const Board = require('../models/Board');
const boardService = require('../services/boardService');
const boardRepository = require('../repositories/boardRepository');

test('Member 2 — Board Model & Schema Unit Tests', async (t) => {
  const dummyOwnerId = new mongoose.Types.ObjectId();

  await t.test('validates required fields (name, ownerId)', async () => {
    const board = new Board({});
    let err;
    try {
      await board.validate();
    } catch (e) {
      err = e;
    }
    assert.ok(err.errors.name, 'Board name should be required');
    assert.ok(err.errors.ownerId, 'Owner ID should be required');
  });

  await t.test('rejects board name exceeding 100 characters', async () => {
    const board = new Board({
      name: 'A'.repeat(101),
      ownerId: dummyOwnerId
    });
    let err;
    try {
      await board.validate();
    } catch (e) {
      err = e;
    }
    assert.ok(err.errors.name, 'Board name exceeding 100 characters should be rejected');
  });

  await t.test('embeds default columns (To Do, Doing, Done) with default colors', () => {
    const board = new Board({
      name: 'Project Alpha',
      ownerId: dummyOwnerId
    });
    assert.equal(board.columns.length, 3);
    assert.equal(board.columns[0].title, 'To Do');
    assert.equal(board.columns[1].title, 'Doing');
    assert.equal(board.columns[2].title, 'Done');
    assert.equal(board.columns[0].color, '#6366f1');
  });

  await t.test('transforms _id to id and excludes __v in toJSON', () => {
    const board = new Board({
      _id: new mongoose.Types.ObjectId(),
      name: 'Sprint Board',
      ownerId: dummyOwnerId
    });
    const json = board.toJSON();
    assert.ok(json.id, 'JSON output should contain id property');
    assert.equal(json._id, undefined, 'JSON output should omit _id');
    assert.equal(json.__v, undefined, 'JSON output should omit __v');
  });
});

test('Member 2 — Board Service & Repository Business Logic Unit Tests', async (t) => {
  t.beforeEach(() => {
    boardRepository.clear();
  });

  await t.test('creates a board with default columns when none are supplied', () => {
    const board = boardService.createBoard({
      name: 'Development Board',
      ownerId: 'user_123'
    });

    assert.equal(board.id, 1);
    assert.equal(board.name, 'Development Board');
    assert.equal(board.ownerId, 'user_123');
    assert.equal(board.columns.length, 3);
    assert.equal(board.columns[0].title, 'To Do');
    assert.equal(board.columns[1].title, 'Doing');
    assert.equal(board.columns[2].title, 'Done');
  });

  await t.test('creates a board with custom columns', () => {
    const board = boardService.createBoard({
      name: 'Custom Workflow',
      ownerId: 'user_123',
      columns: [
        { title: 'Backlog', color: '#8b5cf6' },
        { title: 'In Progress', color: '#3b82f6' },
        { title: 'QA', color: '#ec4899' },
        { title: 'Completed', color: '#10b981' }
      ]
    });

    assert.equal(board.columns.length, 4);
    assert.equal(board.columns[0].title, 'Backlog');
    assert.equal(board.columns[2].title, 'QA');
  });

  await t.test('throws error if board name is empty or missing', () => {
    assert.throws(
      () => boardService.createBoard({ ownerId: 'user_123' }),
      /Board name is required/
    );

    assert.throws(
      () => boardService.createBoard({ name: '   ', ownerId: 'user_123' }),
      /Board name is required/
    );
  });

  await t.test('throws error if board name exceeds 100 characters', () => {
    assert.throws(
      () => boardService.createBoard({ name: 'X'.repeat(101), ownerId: 'user_123' }),
      /Board name cannot exceed 100 characters/
    );
  });

  await t.test('throws error if owner ID is missing', () => {
    assert.throws(
      () => boardService.createBoard({ name: 'Valid Board' }),
      /Owner ID is required/
    );
  });

  await t.test('retrieves board by ID', () => {
    const created = boardService.createBoard({
      name: 'Target Board',
      ownerId: 'user_456'
    });

    const fetched = boardService.getBoardById(created.id);
    assert.equal(fetched.name, 'Target Board');
  });

  await t.test('throws error when retrieving non-existent board ID', () => {
    assert.throws(
      () => boardService.getBoardById(9999),
      /Board not found/
    );
  });

  await t.test('updates board name and description', () => {
    const created = boardService.createBoard({
      name: 'Old Board Name',
      ownerId: 'user_123'
    });

    const updated = boardService.updateBoard(created.id, {
      name: 'New Board Name',
      description: 'Updated Board Description'
    });

    assert.equal(updated.name, 'New Board Name');
    assert.equal(updated.description, 'Updated Board Description');
  });

  await t.test('prevents updating board with invalid empty name', () => {
    const created = boardService.createBoard({
      name: 'Valid Name',
      ownerId: 'user_123'
    });

    assert.throws(
      () => boardService.updateBoard(created.id, { name: '' }),
      /Board name cannot be empty/
    );
  });

  await t.test('deletes a board by ID', () => {
    const created = boardService.createBoard({
      name: 'Board To Delete',
      ownerId: 'user_123'
    });

    const success = boardService.deleteBoard(created.id);
    assert.equal(success, true);
    assert.throws(
      () => boardService.getBoardById(created.id),
      /Board not found/
    );
  });

  await t.test('throws error when deleting a non-existent board', () => {
    assert.throws(
      () => boardService.deleteBoard(9999),
      /Board not found/
    );
  });

  await t.test('adds a new column to a board', () => {
    const board = boardService.createBoard({
      name: 'Kanban Board',
      ownerId: 'user_123'
    });

    const updatedCol = boardService.addColumn(board.id, {
      title: 'Testing',
      color: '#f43f5e'
    });

    assert.equal(updatedCol.title, 'Testing');
    assert.equal(updatedCol.color, '#f43f5e');

    const updatedBoard = boardService.getBoardById(board.id);
    assert.equal(updatedBoard.columns.length, 4);
    assert.equal(updatedBoard.columns[3].title, 'Testing');
  });

  await t.test('throws error when adding a column with empty title', () => {
    const board = boardService.createBoard({
      name: 'Test Board',
      ownerId: 'user_123'
    });

    assert.throws(
      () => boardService.addColumn(board.id, { title: '' }),
      /Column title is required/
    );
  });

  await t.test('updates an existing column title and color', () => {
    const board = boardService.createBoard({
      name: 'Board Columns',
      ownerId: 'user_123'
    });

    const targetColId = board.columns[0].id;
    const updated = boardService.updateColumn(board.id, targetColId, {
      title: 'Backlog Queue',
      color: '#ef4444'
    });

    assert.equal(updated.title, 'Backlog Queue');
    assert.equal(updated.color, '#ef4444');
  });

  await t.test('deletes a column from a board', () => {
    const board = boardService.createBoard({
      name: 'Multi-Column Board',
      ownerId: 'user_123'
    });

    const colToDeleteId = board.columns[2].id; // Delete 'Done'
    const success = boardService.deleteColumn(board.id, colToDeleteId);
    assert.equal(success, true);

    const updatedBoard = boardService.getBoardById(board.id);
    assert.equal(updatedBoard.columns.length, 2);
  });

  await t.test('prevents deleting column if board only has 1 column remaining', () => {
    const board = boardService.createBoard({
      name: 'Single Column Board',
      ownerId: 'user_123',
      columns: [{ title: 'Only Column', color: '#10b981' }]
    });

    const colId = board.columns[0].id;
    assert.throws(
      () => boardService.deleteColumn(board.id, colId),
      /Cannot delete column: Board must have at least one column/
    );
  });

  await t.test('reorders columns on a board', () => {
    const board = boardService.createBoard({
      name: 'Reorder Test Board',
      ownerId: 'user_123'
    });

    const [col1, col2, col3] = board.columns;
    // Reorder to [Done, Doing, To Do]
    const reorderedCols = boardService.reorderColumns(board.id, [col3.id, col2.id, col1.id]);

    assert.equal(reorderedCols[0].id, col3.id);
    assert.equal(reorderedCols[0].position, 0);
    assert.equal(reorderedCols[1].id, col2.id);
    assert.equal(reorderedCols[1].position, 1);
    assert.equal(reorderedCols[2].id, col1.id);
    assert.equal(reorderedCols[2].position, 2);
  });

  await t.test('adds and removes board members', () => {
    const board = boardService.createBoard({
      name: 'Team Project Board',
      ownerId: 'user_owner'
    });

    const withMember = boardService.addMember(board.id, 'user_collaborator');
    assert.ok(withMember.members.includes('user_collaborator'));

    const withoutMember = boardService.removeMember(board.id, 'user_collaborator');
    assert.equal(withoutMember.members.includes('user_collaborator'), false);
  });
});
