import axios from 'axios';

// Backend එකේ URL එක
const API_BASE_URL = 'http://localhost:5000/api/tasks';

// 1. ඔක්කොම tasks ටික ගන්න (Read)
export const getTasks = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

// 2. අලුත් task එකක් හදන්න (Create)
export const createTask = async (taskData) => {
    try {
        const response = await axios.post(API_BASE_URL, taskData);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

// 3. Task එකක් update කරන්න (Update - Column මාරු කරද්දි)
export const updateTask = async (id, taskData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, taskData);
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

// 4. Task එකක් මකන්න (Delete)
export const deleteTask = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};