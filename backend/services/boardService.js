const boardRepository = require('../repositories/boardRepository');

exports.getBoards = (options = {}) => {
  return boardRepository.findAll(options);
};

exports.getBoardById = (id) => {
  const board = boardRepository.findById(id);
  if (!board) {
    throw new Error('Board not found');
  }
  return board;
};

exports.createBoard = (data) => {
  const { name, ownerId, columns, description, members } = data;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new Error('Board name is required');
  }

  if (name.trim().length > 100) {
    throw new Error('Board name cannot exceed 100 characters');
  }

  if (!ownerId) {
    throw new Error('Owner ID is required');
  }

  const defaultColumns = [
    { title: 'To Do', position: 0, color: '#6366f1' },
    { title: 'Doing', position: 1, color: '#f59e0b' },
    { title: 'Done', position: 2, color: '#10b981' }
  ];

  const boardData = {
    name: name.trim(),
    description: description ? description.trim() : '',
    ownerId,
    members: Array.isArray(members) ? members : [],
    columns: Array.isArray(columns) && columns.length > 0 ? columns : defaultColumns
  };

  return boardRepository.create(boardData);
};

exports.updateBoard = (id, data) => {
  const existingBoard = boardRepository.findById(id);
  if (!existingBoard) {
    throw new Error('Board not found');
  }

  const updateData = {};

  if (data.name !== undefined) {
    if (typeof data.name !== 'string' || data.name.trim() === '') {
      throw new Error('Board name cannot be empty');
    }
    if (data.name.trim().length > 100) {
      throw new Error('Board name cannot exceed 100 characters');
    }
    updateData.name = data.name.trim();
  }

  if (data.description !== undefined) {
    updateData.description = typeof data.description === 'string' ? data.description.trim() : '';
  }

  const updatedBoard = boardRepository.update(id, updateData);
  return updatedBoard;
};

exports.deleteBoard = (id) => {
  const success = boardRepository.delete(id);
  if (!success) {
    throw new Error('Board not found');
  }
  return success;
};

exports.addColumn = (boardId, columnData) => {
  const board = boardRepository.findById(boardId);
  if (!board) {
    throw new Error('Board not found');
  }

  const { title, color } = columnData;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    throw new Error('Column title is required');
  }

  const sanitizedColumn = {
    title: title.trim(),
    color: color || '#6366f1'
  };

  return boardRepository.addColumn(boardId, sanitizedColumn);
};

exports.updateColumn = (boardId, columnId, columnData) => {
  const board = boardRepository.findById(boardId);
  if (!board) {
    throw new Error('Board not found');
  }

  const existingColumn = board.columns.find(c => c.id === parseInt(columnId, 10));
  if (!existingColumn) {
    throw new Error('Column not found');
  }

  const sanitizedData = {};
  if (columnData.title !== undefined) {
    if (typeof columnData.title !== 'string' || columnData.title.trim() === '') {
      throw new Error('Column title cannot be empty');
    }
    sanitizedData.title = columnData.title.trim();
  }

  if (columnData.color !== undefined) {
    sanitizedData.color = columnData.color;
  }

  return boardRepository.updateColumn(boardId, columnId, sanitizedData);
};

exports.deleteColumn = (boardId, columnId) => {
  const board = boardRepository.findById(boardId);
  if (!board) {
    throw new Error('Board not found');
  }

  if (board.columns.length <= 1) {
    throw new Error('Cannot delete column: Board must have at least one column');
  }

  const success = boardRepository.deleteColumn(boardId, columnId);
  if (!success) {
    throw new Error('Column not found');
  }

  return success;
};

exports.reorderColumns = (boardId, columnOrderIds) => {
  const board = boardRepository.findById(boardId);
  if (!board) {
    throw new Error('Board not found');
  }

  if (!Array.isArray(columnOrderIds) || columnOrderIds.length === 0) {
    throw new Error('Column order array must be provided');
  }

  return boardRepository.reorderColumns(boardId, columnOrderIds);
};

exports.addMember = (boardId, memberId) => {
  const board = boardRepository.findById(boardId);
  if (!board) {
    throw new Error('Board not found');
  }
  if (!memberId) {
    throw new Error('Member ID is required');
  }

  return boardRepository.addMember(boardId, memberId);
};

exports.removeMember = (boardId, memberId) => {
  const board = boardRepository.findById(boardId);
  if (!board) {
    throw new Error('Board not found');
  }
  return boardRepository.removeMember(boardId, memberId);
};
