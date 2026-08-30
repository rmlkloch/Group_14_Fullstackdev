const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET all tasks
router.get('/', taskController.getTasks);

// POST a new task
router.post('/', taskController.createTask);

// GET a task by ID
router.get('/:id', taskController.getTaskById);

// PATCH/Update a task by ID
router.patch('/:id', taskController.updateTask);

// DELETE a task by ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;
