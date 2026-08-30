const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

/**
 * Save JWT token to localStorage
 */
export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

/**
 * Retrieve JWT token from localStorage
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY) || null;
};

/**
 * Save user data to localStorage
 */
export const setUser = (user) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

/**
 * Helper to decode base64 JWT payload
 */
export const decodeToken = (token) => {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    let payload = parts[1];
    // Add padding if missing
    while (payload.length % 4 !== 0) {
      payload += '=';
    }
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (error) {
    return null;
  }
};

/**
 * Retrieve user data from localStorage or extract from JWT payload
 */
export const getUser = () => {
  const userStr = localStorage.getItem(USER_KEY);
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (err) {
      // Fallback to token payload
    }
  }

  const token = getToken();
  if (token) {
    const decoded = decodeToken(token);
    if (decoded) {
      return {
        id: decoded.sub || 'usr_default',
        email: decoded.email || 'user@company.com',
        name: decoded.name || 'User',
        role: decoded.role || 'member',
      };
    }
  }
  return null;
};

/**
 * Clear token and user data from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * Check if a JWT token is expired based on exp claim
 */
export const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = decodeToken(token);
  if (!decoded) return false; // If opaque/non-standard token, treat as active
  if (!decoded.exp) return false; // No exp claim
  
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

/**
 * Get HTTP Authorization header for API requests
 */
export const getAuthHeader = () => {
  const token = getToken();
  if (token && !isTokenExpired(token)) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

const tokenService = {
  setToken,
  getToken,
  setUser,
  getUser,
  removeToken,
  decodeToken,
  isTokenExpired,
  getAuthHeader,
};

export default tokenService;
