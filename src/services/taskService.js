import apiClient from './api';

/**
 * GET all tasks from REST API
 * @param {Object} [params] Optional query params (e.g. status, boardId)
 */
export const getTasks = async (params = {}) => {
    const response = await apiClient.get('/tasks', { params });
    return response.data;
};

/**
 * GET a single task by ID
 * @param {string|number} id
 */
export const getTaskById = async (id) => {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
};

/**
 * CREATE a new task
 * @param {Object} taskData
 */
export const createTask = async (taskData) => {
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
};

/**
 * UPDATE an existing task (supports version / baseVersion for concurrency)
 * @param {string|number} id
 * @param {Object} taskData
 */
export const updateTask = async (id, taskData) => {
    const response = await apiClient.put(`/tasks/${id}`, taskData);
    return response.data;
};

/**
 * DELETE a task by ID
 * @param {string|number} id
 */
export const deleteTask = async (id) => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
};
