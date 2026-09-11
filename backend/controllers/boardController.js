const boardService = require('../services/boardService');

// Get all boards
exports.getBoards = (req, res) => {
  try {
    const { ownerId, memberId, name, page, limit } = req.query;
    const options = { ownerId, memberId, name, page, limit };
    const result = boardService.getBoards(options);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get board by ID
exports.getBoardById = (req, res) => {
  try {
    const board = boardService.getBoardById(req.params.id);
    res.status(200).json(board);
  } catch (error) {
    if (error.message === 'Board not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Create a new board
exports.createBoard = (req, res) => {
  try {
    const newBoard = boardService.createBoard(req.body);
    res.status(201).json(newBoard);
  } catch (error) {
    if (
      error.message === 'Board name is required' ||
      error.message === 'Board name cannot exceed 100 characters' ||
      error.message === 'Owner ID is required'
    ) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Update an existing board
exports.updateBoard = (req, res) => {
  try {
    const updatedBoard = boardService.updateBoard(req.params.id, req.body);
    res.status(200).json(updatedBoard);
  } catch (error) {
    if (error.message === 'Board not found') {
      return res.status(404).json({ message: error.message });
    }
    if (
      error.message === 'Board name cannot be empty' ||
      error.message === 'Board name cannot exceed 100 characters'
    ) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Delete a board
exports.deleteBoard = (req, res) => {
  try {
    boardService.deleteBoard(req.params.id);
    res.status(200).json({ message: 'Board deleted successfully' });
  } catch (error) {
    if (error.message === 'Board not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Add column to board
exports.addColumn = (req, res) => {
  try {
    const newColumn = boardService.addColumn(req.params.id, req.body);
    res.status(201).json(newColumn);
  } catch (error) {
    if (error.message === 'Board not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Column title is required') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Update column in board
exports.updateColumn = (req, res) => {
  try {
    const updatedColumn = boardService.updateColumn(
      req.params.id,
      req.params.columnId,
      req.body
    );
    res.status(200).json(updatedColumn);
  } catch (error) {
    if (error.message === 'Board not found' || error.message === 'Column not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Column title cannot be empty') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Delete column from board
exports.deleteColumn = (req, res) => {
  try {
    boardService.deleteColumn(req.params.id, req.params.columnId);
    res.status(200).json({ message: 'Column deleted successfully' });
  } catch (error) {
    if (error.message === 'Board not found' || error.message === 'Column not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Cannot delete column: Board must have at least one column') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Reorder columns
exports.reorderColumns = (req, res) => {
  try {
    const { columnOrderIds } = req.body;
    const reordered = boardService.reorderColumns(req.params.id, columnOrderIds);
    res.status(200).json(reordered);
  } catch (error) {
    if (error.message === 'Board not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Column order array must be provided') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};
