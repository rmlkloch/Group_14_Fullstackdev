let tasks = [];
let currentId = 1;

exports.findAll = (options = {}) => {
  const { status, assignee, sortBy, order, page, limit } = options;
  
  let result = [...tasks];

  if (status) {
    result = result.filter(t => t.status === status);
  }
  if (assignee) {
    result = result.filter(t => t.assignee === assignee);
  }

  if (sortBy) {
    result.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      
      if (valA < valB) return order === 'desc' ? 1 : -1;
      if (valA > valB) return order === 'desc' ? -1 : 1;
      return 0;
    });
  }

  const totalCount = result.length;

  if (page && limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    result = result.slice(startIndex, endIndex);
  }

  return {
    data: result,
    totalCount,
    page,
    limit
  };
};

exports.findById = (id) => {
  return tasks.find(t => t.id === parseInt(id, 10));
};

exports.create = (taskData) => {
  const newTask = {
    id: currentId++,
    ...taskData,
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  return newTask;
};

exports.update = (id, taskData) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id, 10));
  if (taskIndex === -1) {
    return null;
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...taskData,
    updatedAt: new Date().toISOString()
  };

  return tasks[taskIndex];
};

exports.delete = (id) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id, 10));
  if (taskIndex === -1) {
    return false;
  }
  tasks.splice(taskIndex, 1);
  return true;
};
