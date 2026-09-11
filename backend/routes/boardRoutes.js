const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

// GET all boards & POST a new board
router.get('/', boardController.getBoards);
router.post('/', boardController.createBoard);

// GET, PATCH, DELETE board by ID
router.get('/:id', boardController.getBoardById);
router.patch('/:id', boardController.updateBoard);
router.delete('/:id', boardController.deleteBoard);

// Column routes
router.post('/:id/columns', boardController.addColumn);
router.put('/:id/columns/reorder', boardController.reorderColumns);
router.patch('/:id/columns/:columnId', boardController.updateColumn);
router.delete('/:id/columns/:columnId', boardController.deleteColumn);

module.exports = router;
