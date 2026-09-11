import apiClient from './api';

/**
 * GET all boards from REST API
 */
export const getBoards = async () => {
    const response = await apiClient.get('/boards');
    return response.data;
};

/**
 * GET a single board by ID
 * @param {string|number} id
 */
export const getBoardById = async (id) => {
    const response = await apiClient.get(`/boards/${id}`);
    return response.data;
};

/**
 * CREATE a new board
 * @param {Object} boardData
 */
export const createBoard = async (boardData) => {
    const response = await apiClient.post('/boards', boardData);
    return response.data;
};

/**
 * UPDATE an existing board
 * @param {string|number} id
 * @param {Object} boardData
 */
export const updateBoard = async (id, boardData) => {
    const response = await apiClient.put(`/boards/${id}`, boardData);
    return response.data;
};

/**
 * DELETE a board by ID
 * @param {string|number} id
 */
export const deleteBoard = async (id) => {
    const response = await apiClient.delete(`/boards/${id}`);
    return response.data;
};
