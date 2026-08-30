let tasks = [];
let currentId = 1;

// Get all tasks
exports.getTasks = (req, res) => {
  res.status(200).json(tasks);
};

// Get task by ID
exports.getTaskById = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id, 10));
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.status(200).json(task);
};

// Create a new task
exports.createTask = (req, res) => {
  const { title, ...otherData } = req.body;
  
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ message: 'Task title is required' });
  }

  const newTask = {
    id: currentId++,
    title: title.trim(),
    ...otherData,
    createdAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
};

// Update an existing task
exports.updateTask = (req, res) => {
  const { title, ...otherData } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ message: 'Task title is required' });
  }

  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id, 10));
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...otherData,
    title: title.trim(),
    updatedAt: new Date().toISOString()
  };

  res.status(200).json(tasks[taskIndex]);
};

// Delete a task
exports.deleteTask = (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id, 10));
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: 'Task deleted successfully' });
};
