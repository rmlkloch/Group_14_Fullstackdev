const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// Route mapping for /api/tasks
router
  .route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router
  .route('/:id')
  .get(protect, getTaskById)
  .put(protect, updateTask)
  .patch(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
