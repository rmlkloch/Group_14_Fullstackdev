import tokenService from './tokenService';

const BASE_URL = '/api';

/**
 * Custom fetch wrapper with automatic Authorization header injection
 * and global 401/403 unauthorized response interception.
 */
export const apiFetch = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
  
  // Merge default headers with Authorization header
  const authHeader = tokenService.getAuthHeader();
  const headers = {
    'Content-Type': 'application/json',
    ...authHeader,
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // Global 401 Unauthorized / 403 Forbidden Interceptor
    if (response.status === 401 || response.status === 403) {
      console.warn(`[Auth Interceptor] Captured ${response.status} response. Triggering automatic session cleanup.`);
      
      tokenService.removeToken();

      // Dispatch global event for AuthContext to react
      window.dispatchEvent(
        new CustomEvent('auth:unauthorized', {
          detail: {
            status: response.status,
            message: response.status === 401 
              ? 'Session expired or invalid authentication token.' 
              : 'Access denied: You do not have authorization for this resource.',
          },
        })
      );
    }

    return response;
  } catch (error) {
    console.error('[API Fetch Error]', error);
    throw error;
  }
};

const apiClient = {
  fetch: apiFetch,
  get: (url, options = {}) => apiFetch(url, { ...options, method: 'GET' }),
  post: (url, data, options = {}) => apiFetch(url, { ...options, method: 'POST', body: JSON.stringify(data) }),
  put: (url, data, options = {}) => apiFetch(url, { ...options, method: 'PUT', body: JSON.stringify(data) }),
  delete: (url, options = {}) => apiFetch(url, { ...options, method: 'DELETE' }),
};

export default apiClient;
