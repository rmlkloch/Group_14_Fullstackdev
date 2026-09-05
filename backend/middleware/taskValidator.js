const mongoose = require('mongoose');

// Validate Mongo ObjectId
const validateObjectId = (paramName) => (req, res, next) => {
  const id = req.params[paramName];
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: 'Invalid ID Format',
      message: `The provided ${paramName} is not a valid MongoDB ObjectId.`
    });
  }
  next();
};

// Validate Task Creation / Updates
const validateTaskInput = (req, res, next) => {
  const { title, status, priority, dueDate } = req.body;

  if (req.method === 'POST' && !title) {
    return res.status(400).json({ error: 'Validation Error', message: 'Task title is required.' });
  }

  if (status && !['todo', 'in-progress', 'completed'].includes(status)) {
    return res.status(400).json({ error: 'Validation Error', message: 'Invalid task status.' });
  }

  if (priority && !['low', 'medium', 'high'].includes(priority)) {
    return res.status(400).json({ error: 'Validation Error', message: 'Invalid priority level.' });
  }

  if (dueDate && isNaN(Date.parse(dueDate))) {
    return res.status(400).json({ error: 'Validation Error', message: 'Invalid date format.' });
  }

  next();
};

module.exports = { validateObjectId, validateTaskInput };