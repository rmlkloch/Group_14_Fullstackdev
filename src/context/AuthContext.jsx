// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import tokenService from '../services/tokenService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(() => tokenService.getToken());
  const [user, setUserState] = useState(null); // Wait for real API verification
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validate token status locally
  const checkLocalAuth = useCallback(() => {
    const storedToken = tokenService.getToken();
    if (!storedToken) {
      setTokenState(null);
      setUserState(null);
      return false;
    }

    if (tokenService.isTokenExpired(storedToken)) {
      tokenService.removeToken();
      setTokenState(null);
      setUserState(null);
      setAuthError('Your session has expired. Please sign in again.');
      return false;
    }

    setTokenState(storedToken);
    return true;
  }, []);

  // Restore session on app start using GET /api/auth/me
  const restoreSession = useCallback(async () => {
    const isLocallyValid = checkLocalAuth();
    const currentToken = tokenService.getToken();

    if (!isLocallyValid || !currentToken) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const userData = data.user || data.data || data;
        tokenService.setUser(userData);
        setUserState(userData);
      } else {
        tokenService.removeToken();
        setTokenState(null);
        setUserState(null);
      }
    } catch (error) {
      console.warn('Backend server offline during session restore. Preserving local session data.');
      setUserState(tokenService.getUser()); // Fallback to local decoded user
    } finally {
      setLoading(false);
    }
  }, [checkLocalAuth]);

  // Listen for global 401/403 API response events
  useEffect(() => {
    const handleUnauthorizedEvent = (event) => {
      const message = event?.detail?.message || 'Session expired or unauthorized access.';
      tokenService.removeToken();
      setTokenState(null);
      setUserState(null);
      setAuthError(message);
    };

    window.addEventListener('auth:unauthorized', handleUnauthorizedEvent);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorizedEvent);
    };
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  // Handle successful login
  const login = (authToken, userData = null) => {
    if (authToken) {
      tokenService.setToken(authToken);
      setTokenState(authToken);
    }
    
    if (userData) {
      tokenService.setUser(userData);
      setUserState(userData);
    }
    
    setAuthError(null);
  };

  // Handle logout
  const logout = (reason = null) => {
    tokenService.removeToken();
    setTokenState(null);
    setUserState(null);
    if (reason) {
      setAuthError(reason);
    }
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  // Helper to check user roles
  const hasRole = (requiredRole) => {
    if (!user || !user.role) return false;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    return user.role === requiredRole;
  };

  const isAuthenticated = Boolean(token && !tokenService.isTokenExpired(token));

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setUser: setUserState, // Compatibility for older code
        isAuthenticated,
        authError,
        loading,
        login,
        logout,
        checkAuth: checkLocalAuth,
        clearAuthError,
        hasRole,
        getAuthHeader: tokenService.getAuthHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;