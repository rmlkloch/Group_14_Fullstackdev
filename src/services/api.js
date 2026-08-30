import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create one centralized Axios client
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// =====================================================
// REQUEST INTERCEPTOR
// Automatically send JWT using Bearer format
// =====================================================

apiClient.interceptors.request.use(
    (config) => {
        const token =
            localStorage.getItem('token') ||
            localStorage.getItem('authToken') ||
            localStorage.getItem('jwt');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// =====================================================
// RESPONSE INTERCEPTOR
// Centralized 401 handling
// =====================================================

apiClient.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response?.status === 401) {
            console.warn(
                'Authentication expired or invalid. Logging out.'
            );

            // Remove expired / invalid authentication data
            localStorage.removeItem('token');
            localStorage.removeItem('authToken');
            localStorage.removeItem('jwt');
            localStorage.removeItem('isLoggedIn');

            // Notify the React application
            window.dispatchEvent(
                new Event('auth-expired')
            );
        }

        return Promise.reject(error);
    }
);

// =====================================================
// TASK API
// =====================================================

// GET all tasks
export const getTasks = async () => {
    const response = await apiClient.get('/tasks');
    return response.data;
};

// GET single task
export const getTaskById = async (id) => {
    const response = await apiClient.get(
        `/tasks/${id}`
    );

    return response.data;
};

// CREATE task
export const createTask = async (taskData) => {
    const response = await apiClient.post(
        '/tasks',
        taskData
    );

    return response.data;
};

// UPDATE task
export const updateTask = async (
    id,
    taskData
) => {
    const response = await apiClient.put(
        `/tasks/${id}`,
        taskData
    );

    return response.data;
};

// DELETE task
export const deleteTask = async (id) => {
    const response = await apiClient.delete(
        `/tasks/${id}`
    );

    return response.data;
};

export default apiClient;
