const mongoose = require('mongoose');
const Board = require('../models/Board');
const Task = require('../models/Task');
const boardService = require('../services/boardService');
const boardRepository = require('../repositories/boardRepository');

const { buildQueryOptions } = require('../services/queryService');

/**
 * @desc    Get all boards for authenticated user
 * @route   GET /api/boards
 * @access  Private
 */
exports.getBoards = async (req, res) => {
  try {
    const memResult = boardRepository.findAll(req.query);
    if (memResult.data.length > 0 || !Board.db || Board.db.readyState !== 1) {
      return res.status(200).json(memResult);
    }

    const userId = req.user ? req.user._id : null;
    
    // Base filter to ensure users only see their own boards
    const baseFilter = userId
      ? { $or: [{ ownerId: userId }, { members: userId }] }
      : {};

    // Get dynamic options from query service
    const { filter, sortOptions, projection } = buildQueryOptions(req.query);

    // Merge base authentication filter with any dynamic filters passed in the query
    const finalFilter = { ...baseFilter, ...filter };

    let boardQuery = Board.find(finalFilter).sort(sortOptions);

    if (projection) {
      boardQuery = boardQuery.select(projection);
    }

    const boards = await boardQuery;

    return res.status(200).json({ data: boards, totalCount: boards.length });
  } catch (error) {
    console.error('Error in getBoards:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get single board by ID with populated columns
 * @route   GET /api/boards/:id
 * @access  Private
 */
exports.getBoardById = async (req, res) => {
  try {
    const { id } = req.params;

    const memBoard = boardRepository.findById(id);
    if (memBoard) {
      return res.status(200).json(memBoard);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Board not found' });
    }

    const board = await Board.findById(id)
      .populate('ownerId', 'name email avatar')
      .populate('members', 'name email avatar');

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    return res.status(200).json(board);
  } catch (error) {
    console.error('Error in getBoardById:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Create a new board with default embedded columns if none provided
 * @route   POST /api/boards
 * @access  Private
 */
exports.createBoard = async (req, res) => {
  try {
    const { name, description, members, columns } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Board name is required' });
    }

    if (name.length > 100) {
      return res.status(400).json({ message: 'Board name cannot exceed 100 characters' });
    }

    const ownerId = req.body.ownerId;

    if (!ownerId) {
      return res.status(400).json({ message: 'Owner ID is required' });
    }

    try {
      const created = boardService.createBoard({ name: name.trim(), ownerId, description, columns, members });
      return res.status(201).json(created);
    } catch (e) {
      if (!Board.db || Board.db.readyState !== 1) {
        return res.status(400).json({ message: e.message });
      }
    }

    const boardData = {
      name: name.trim(),
      description: description ? description.trim() : '',
      ownerId,
      members: members || [],
    };

    if (columns && Array.isArray(columns) && columns.length > 0) {
      boardData.columns = columns;
    }

    const board = new Board(boardData);
    const createdBoard = await board.save();

    return res.status(201).json(createdBoard);
  } catch (error) {
    console.error('Error in createBoard:', error.message);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update board details (name, description, members)
 * @route   PUT /api/boards/:id
 * @access  Private
 */
exports.updateBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (name !== undefined && (!name || !name.trim())) {
      return res.status(400).json({ message: 'Board name cannot be empty' });
    }

    if (boardRepository.findById(id)) {
      const updated = boardService.updateBoard(id, req.body);
      return res.status(200).json(updated);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid board ID format' });
    }

    const updatedBoard = await Board.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedBoard) {
      return res.status(404).json({ message: 'Board not found' });
    }

    return res.status(200).json(updatedBoard);
  } catch (error) {
    console.error('Error in updateBoard:', error.message);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete board and cascade delete associated tasks
 * @route   DELETE /api/boards/:id
 * @access  Private
 */
exports.deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;

    if (boardRepository.findById(id)) {
      boardService.deleteBoard(id);
      return res.status(200).json({ message: 'Board deleted successfully' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid board ID format' });
    }

    const deletedBoard = await Board.findByIdAndDelete(id);

    if (!deletedBoard) {
      return res.status(404).json({ message: 'Board not found' });
    }

    // Cascade clean up associated tasks
    await Task.deleteMany({ boardId: id });

    return res.status(200).json({ message: 'Board deleted successfully' });
  } catch (error) {
    console.error('Error in deleteBoard:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Add a new embedded column to a board
 * @route   POST /api/boards/:id/columns
 * @access  Private
 */
exports.addColumn = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, position, color } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Column title is required', error: 'Please add a column title' });
    }

    if (boardRepository.findById(id)) {
      const newCol = boardService.addColumn(id, req.body);
      return res.status(201).json(newCol);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid board ID format' });
    }

    const board = await Board.findById(id);

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    const newPosition = position !== undefined ? position : board.columns.length;
    board.columns.push({ title: title.trim(), position: newPosition, color: color || '#6366f1' });
    await board.save();

    const addedColumn = board.columns[board.columns.length - 1];
    return res.status(201).json(addedColumn);
  } catch (error) {
    console.error('Error in addColumn:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

exports.reorderColumns = async (req, res) => {
  try {
    const { id } = req.params;
    const { columnOrderIds } = req.body;

    if (!columnOrderIds || !Array.isArray(columnOrderIds)) {
      return res.status(400).json({ message: 'columnOrderIds array is required' });
    }

    if (boardRepository.findById(id)) {
      const updatedColumns = boardService.reorderColumns(id, columnOrderIds);
      return res.status(200).json(updatedColumns);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid board ID format' });
    }

    const board = await Board.findById(id);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    const columnMap = new Map(board.columns.map((col) => [col._id.toString(), col]));
    board.columns = columnOrderIds
      .map((colId, index) => {
        const col = columnMap.get(colId);
        if (col) col.position = index;
        return col;
      })
      .filter(Boolean);

    await board.save();
    return res.status(200).json(board.columns);
  } catch (error) {
    console.error('Error in reorderColumns:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update an embedded column's properties (title, position, color)
 * @route   PUT /api/boards/:id/columns/:columnId
 * @access  Private
 */
exports.updateColumn = async (req, res) => {
  try {
    const { id, columnId } = req.params;

    if (boardRepository.findById(id)) {
      const { title } = req.body;
      if (title !== undefined && (!title || !title.trim())) {
        return res.status(400).json({ message: 'Column title is required' });
      }
      const updatedCol = boardService.updateColumn(id, columnId, req.body);
      return res.status(200).json(updatedCol);
    }

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(columnId)) {
      return res.status(400).json({ message: 'Invalid board or column ID format' });
    }

    const { title, position, color } = req.body;
    const updateFields = {};

    if (title !== undefined) updateFields['columns.$.title'] = title.trim();
    if (position !== undefined) updateFields['columns.$.position'] = position;
    if (color !== undefined) updateFields['columns.$.color'] = color;

    const updatedBoard = await Board.findOneAndUpdate(
      { _id: id, 'columns._id': columnId },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedBoard) {
      return res.status(404).json({ message: 'Board or column not found' });
    }

    return res.status(200).json(updatedBoard);
  } catch (error) {
    console.error('Error in updateColumn:', error.message);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete an embedded column from a board
 * @route   DELETE /api/boards/:id/columns/:columnId
 * @access  Private
 */
exports.deleteColumn = async (req, res) => {
  try {
    const { id, columnId } = req.params;

    if (boardRepository.findById(id)) {
      const board = boardRepository.findById(id);
      if (board.columns.length <= 1) {
        return res.status(400).json({ message: 'Cannot delete column: Board must have at least one column' });
      }
      boardService.deleteColumn(id, columnId);
      return res.status(200).json({ message: 'Column deleted successfully' });
    }

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(columnId)) {
      return res.status(400).json({ message: 'Invalid board or column ID format' });
    }

    const updatedBoard = await Board.findByIdAndUpdate(
      id,
      { $pull: { columns: { _id: columnId } } },
      { new: true }
    );

    if (!updatedBoard) {
      return res.status(404).json({ message: 'Board not found' });
    }

    return res.status(200).json({ message: 'Column deleted successfully' });
  } catch (error) {
    console.error('Error in deleteColumn:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get board analytics & statistics via MongoDB aggregation pipeline
 * @route   GET /api/boards/:id/analytics (or /api/boards/:boardId/analytics)
 * @access  Private
 */
exports.getBoardAnalytics = async (req, res) => {
  try {
    const id = req.params.id || req.params.boardId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid board ID format' });
    }

    const boardObjectId = new mongoose.Types.ObjectId(id);

    // Verify board exists
    const board = await Board.findById(id);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    const now = new Date();

    // Aggregation pipeline using $facet
    const analyticsResults = await Task.aggregate([
      {
        $match: { boardId: boardObjectId },
      },
      {
        $facet: {
          taskCounts: [{ $count: 'total' }],
          tasksByStatus: [
            {
              $group: {
                _id: '$status',
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                status: '$_id',
                count: 1,
              },
            },
          ],
          tasksByAssignee: [
            {
              $group: {
                _id: '$assignee',
                count: { $sum: 1 },
              },
            },
            {
              $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user',
              },
            },
            {
              $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                _id: 0,
                assigneeId: '$_id',
                count: 1,
                user: {
                  $cond: {
                    if: { $ne: ['$_id', null] },
                    then: {
                      id: '$user._id',
                      name: '$user.name',
                      email: '$user.email',
                    },
                    else: null,
                  },
                },
              },
            },
          ],
          overdueTasks: [
            {
              $match: {
                dueDate: { $ne: null, $lt: now },
                status: { $ne: 'Done' },
              },
            },
            {
              $project: {
                _id: 0,
                id: '$_id',
                title: 1,
                dueDate: 1,
                status: 1,
                priority: 1,
                assignee: 1,
              },
            },
          ],
        },
      },
    ]);

    const resultFacet = analyticsResults[0] || {};
    const totalTasks =
      resultFacet.taskCounts && resultFacet.taskCounts.length > 0
        ? resultFacet.taskCounts[0].total
        : 0;

    const tasksByStatus = resultFacet.tasksByStatus || [];
    const tasksByAssignee = resultFacet.tasksByAssignee || [];
    const overdueList = resultFacet.overdueTasks || [];

    return res.status(200).json({
      boardId: id,
      boardName: board.name,
      totalTasks,
      tasksByStatus,
      tasksByAssignee,
      overdueTasks: {
        count: overdueList.length,
        tasks: overdueList,
      },
    });
  } catch (error) {
    console.error('Error in getBoardAnalytics:', error.message);
    return res.status(500).json({ message: error.message });
  }
};
