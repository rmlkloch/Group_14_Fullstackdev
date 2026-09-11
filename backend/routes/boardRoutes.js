const express = require('express');
const router = express.Router();
const {
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  addColumn,
  updateColumn,
  deleteColumn,
  getBoardAnalytics,
} = require('../controllers/boardController');
const { protect } = require('../middleware/authMiddleware');

// Board CRUD routes
router
  .route('/')
  .get(protect, getBoards)
  .post(protect, createBoard);

router
  .route('/:id')
  .get(protect, getBoardById)
  .put(protect, updateBoard)
  .patch(protect, updateBoard)
  .delete(protect, deleteBoard);

// Board Analytics route
router
  .route('/:id/analytics')
  .get(protect, getBoardAnalytics);

// Embedded Column operations routes
router
  .route('/:id/columns')
  .post(protect, addColumn);

router
  .route('/:id/columns/:columnId')
  .put(protect, updateColumn)
  .patch(protect, updateColumn)
  .delete(protect, deleteColumn);

module.exports = router;
