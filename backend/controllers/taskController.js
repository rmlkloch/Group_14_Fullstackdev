const mongoose = require('mongoose');
const Task = require('../models/Task');

const { buildQueryOptions } = require('../services/queryService');

/**
 * @desc    Fetch tasks from MongoDB with filtering, sorting, pagination, and projection
 * @route   GET /api/tasks
 * @access  Private / Public (Protected via JWT middleware when specified)
 */
exports.getTasks = async (req, res) => {
  try {
    const { filter, sortOptions, projection, page, limit, skip } = buildQueryOptions(req.query);

    // Query total count for pagination metadata using the dynamically built filter
    const totalTasks = await Task.countDocuments(filter);
    const totalPages = Math.ceil(totalTasks / limit) || (totalTasks === 0 ? 0 : 1);

    // Query execution with pagination, optional projection, and sorting
    let taskQuery = Task.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    if (projection) {
      taskQuery = taskQuery.select(projection);
    }

    const tasks = await taskQuery;

    return res.status(200).json({
      tasks,
      totalTasks,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('Error in getTasks:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get single task by _id
 * @route   GET /api/tasks/:id
 * @access  Private
 */
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error('Error in getTaskById:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Private
 */
exports.createTask = async (req, res) => {
  try {
    const taskData = { ...req.body };

    // Attach req.user._id as creator/reporter/assignee if applicable
    if (req.user && req.user._id) {
      if (!taskData.reporter) {
        taskData.reporter = req.user._id;
      }
      if (!taskData.assignee && req.body.assignToSelf) {
        taskData.assignee = req.user._id;
      }
    }

    const task = new Task(taskData);
    const createdTask = await task.save();

    return res.status(201).json(createdTask);
  } catch (error) {
    console.error('Error in createTask:', error.message);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update task by _id
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error in updateTask:', error.message);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid field data format' });
    }
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete task by _id
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task removed' });
  } catch (error) {
    console.error('Error in deleteTask:', error.message);
    return res.status(500).json({ message: error.message });
  }
};
