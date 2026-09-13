let boards = [];
let currentBoardId = 1;
let currentColumnId = 100;

exports.findAll = (options = {}) => {
  const { ownerId, memberId, name, page, limit } = options;

  let result = [...boards];

  if (ownerId) {
    result = result.filter(b => b.ownerId === ownerId);
  }

  if (memberId) {
    result = result.filter(b => b.members && b.members.includes(memberId));
  }

  if (name) {
    result = result.filter(b => b.name.toLowerCase().includes(name.toLowerCase()));
  }

  const totalCount = result.length;

  if (page && limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    result = result.slice(startIndex, endIndex);
  }

  return {
    data: result,
    totalCount,
    page: page || 1,
    limit: limit || totalCount
  };
};

exports.findById = (id) => {
  return boards.find(b => b.id === parseInt(id, 10)) || null;
};

exports.create = (boardData) => {
  const newBoard = {
    id: currentBoardId++,
    name: boardData.name,
    description: boardData.description || '',
    ownerId: boardData.ownerId,
    members: boardData.members || [],
    columns: (boardData.columns || []).map((col, index) => ({
      id: currentColumnId++,
      title: col.title,
      position: col.position !== undefined ? col.position : index,
      color: col.color || '#6366f1'
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  boards.push(newBoard);
  return { ...newBoard };
};

exports.update = (id, boardData) => {
  const boardIndex = boards.findIndex(b => b.id === parseInt(id, 10));
  if (boardIndex === -1) {
    return null;
  }

  boards[boardIndex] = {
    ...boards[boardIndex],
    ...boardData,
    updatedAt: new Date().toISOString()
  };

  return { ...boards[boardIndex] };
};

exports.delete = (id) => {
  const boardIndex = boards.findIndex(b => b.id === parseInt(id, 10));
  if (boardIndex === -1) {
    return false;
  }
  boards.splice(boardIndex, 1);
  return true;
};

exports.addColumn = (boardId, columnData) => {
  const board = boards.find(b => b.id === parseInt(boardId, 10));
  if (!board) return null;

  const newColumn = {
    id: currentColumnId++,
    title: columnData.title,
    position: columnData.position !== undefined ? columnData.position : board.columns.length,
    color: columnData.color || '#6366f1'
  };

  board.columns.push(newColumn);
  board.updatedAt = new Date().toISOString();
  return { ...newColumn };
};

exports.updateColumn = (boardId, columnId, columnData) => {
  const board = boards.find(b => b.id === parseInt(boardId, 10));
  if (!board) return null;

  const colIndex = board.columns.findIndex(c => c.id === parseInt(columnId, 10));
  if (colIndex === -1) return null;

  board.columns[colIndex] = {
    ...board.columns[colIndex],
    ...columnData
  };
  board.updatedAt = new Date().toISOString();
  return { ...board.columns[colIndex] };
};

exports.deleteColumn = (boardId, columnId) => {
  const board = boards.find(b => b.id === parseInt(boardId, 10));
  if (!board) return false;

  const colIndex = board.columns.findIndex(c => c.id === parseInt(columnId, 10));
  if (colIndex === -1) return false;

  board.columns.splice(colIndex, 1);
  board.updatedAt = new Date().toISOString();
  return true;
};

exports.reorderColumns = (boardId, columnOrderIds) => {
  const board = boards.find(b => b.id === parseInt(boardId, 10));
  if (!board) return null;

  const reordered = [];
  columnOrderIds.forEach((colId, index) => {
    const existingCol = board.columns.find(c => c.id === parseInt(colId, 10));
    if (existingCol) {
      existingCol.position = index;
      reordered.push(existingCol);
    }
  });

  board.columns = reordered;
  board.updatedAt = new Date().toISOString();
  return [...board.columns];
};

exports.addMember = (boardId, memberId) => {
  const board = boards.find(b => b.id === parseInt(boardId, 10));
  if (!board) return null;

  if (!board.members.includes(memberId)) {
    board.members.push(memberId);
    board.updatedAt = new Date().toISOString();
  }

  return { ...board };
};

exports.removeMember = (boardId, memberId) => {
  const board = boards.find(b => b.id === parseInt(boardId, 10));
  if (!board) return null;

  board.members = board.members.filter(m => m !== memberId);
  board.updatedAt = new Date().toISOString();
  return { ...board };
};

exports.clear = () => {
  boards = [];
  currentBoardId = 1;
  currentColumnId = 100;
};
