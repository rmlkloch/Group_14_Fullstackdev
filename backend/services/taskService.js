const taskRepository = require('../repositories/taskRepository');

exports.getTasks = (options = {}) => {
  let { status, assignee, sortBy, order, page, limit } = options;
  
  let parsedPage = parseInt(page, 10) || 1;
  let parsedLimit = parseInt(limit, 10) || 10;
  
  if (parsedPage < 1) parsedPage = 1;
  if (parsedLimit < 1) parsedLimit = 10;
  if (parsedLimit > 100) parsedLimit = 100;

  const sanitizedOptions = {
    status,
    assignee,
    sortBy,
    order: order === 'desc' ? 'desc' : 'asc',
    page: parsedPage,
    limit: parsedLimit
  };

  return taskRepository.findAll(sanitizedOptions);
};

exports.getTaskById = (id) => {
  const task = taskRepository.findById(id);
  if (!task) {
    throw new Error('Task not found');
  }
  return task;
};

exports.createTask = (data) => {
  const { title, ...otherData } = data;
  
  if (!title || typeof title !== 'string' || title.trim() === '') {
    throw new Error('Task title is required');
  }

  const taskData = {
    title: title.trim(),
    ...otherData
  };

  return taskRepository.create(taskData);
};

exports.updateTask = (id, data) => {
  const { title, ...otherData } = data;

  const taskData = { ...otherData };

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      throw new Error('Task title cannot be empty');
    }
    taskData.title = title.trim();
  }

  const updatedTask = taskRepository.update(id, taskData);
  if (!updatedTask) {
    throw new Error('Task not found');
  }

  return updatedTask;
};

exports.deleteTask = (id) => {
  const success = taskRepository.delete(id);
  if (!success) {
    throw new Error('Task not found');
  }
  return success;
};
