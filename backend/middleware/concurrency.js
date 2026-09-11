
const Task = require('../models/Task');

const handleOptimisticConcurrency = async (req, res, next) => {
  const taskId = req.params.id;
  const { baseVersion } = req.body;

  if (baseVersion === undefined) {
    return next(); // Proceed if no versioning is passed
  }

  try {
    const existingTask = await Task.findById(taskId);

    if (!existingTask) {
      return res.status(404).json({ error: 'Not Found', message: 'Task not found.' });
    }

    // Check version conflict
    if (existingTask.__v !== Number(baseVersion)) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'This task was modified by another user. Please refresh and try again.',
        currentTask: existingTask
      });
    }

    req.existingTask = existingTask;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { handleOptimisticConcurrency };