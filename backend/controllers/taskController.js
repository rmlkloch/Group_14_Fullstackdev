const taskService = require('../services/taskService');

// Get all tasks
exports.getTasks = (req, res) => {
  try {
    const { status, assignee, sortBy, order, page, limit } = req.query;
    const options = { status, assignee, sortBy, order, page, limit };
    const result = taskService.getTasks(options);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get task by ID
exports.getTaskById = (req, res) => {
  try {
    const task = taskService.getTaskById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    if (error.message === 'Task not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
exports.createTask = (req, res) => {
  try {
    const newTask = taskService.createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    if (error.message === 'Task title is required') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Update an existing task
exports.updateTask = (req, res) => {
  try {
    const updatedTask = taskService.updateTask(req.params.id, req.body);
    res.status(200).json(updatedTask);
  } catch (error) {
    if (error.message === 'Task not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Task title cannot be empty') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
exports.deleteTask = (req, res) => {
  try {
    taskService.deleteTask(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    if (error.message === 'Task not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};
