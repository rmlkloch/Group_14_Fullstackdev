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
        const status = error.response?.status;

        if (status === 401) {
            console.warn('Authentication expired or invalid (401). Logging out.');
            localStorage.removeItem('token');
            localStorage.removeItem('authToken');
            localStorage.removeItem('jwt');
            localStorage.removeItem('isLoggedIn');
            window.dispatchEvent(new Event('auth-expired'));
        } else if (status === 403) {
            console.warn('Forbidden access (403).');
        } else if (status === 404) {
            console.warn('Requested resource not found (404).');
        } else if (status === 409) {
            console.warn('Conflict detected (409). Optimistic concurrency failure.');
        }

        return Promise.reject(error);
    }
);

// Re-export task services for backwards compatibility
export {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from './taskService';

export default apiClient;

