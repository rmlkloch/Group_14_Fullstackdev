import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import tokenService from '../services/tokenService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(() => tokenService.getToken());
  const [user, setUserState] = useState(() => tokenService.getUser());
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validate token status
  const checkAuth = useCallback(() => {
    const storedToken = tokenService.getToken();
    if (!storedToken) {
      setTokenState(null);
      setUserState(null);
      setLoading(false);
      return false;
    }

    if (tokenService.isTokenExpired(storedToken)) {
      tokenService.removeToken();
      setTokenState(null);
      setUserState(null);
      setAuthError('Your session has expired. Please sign in again.');
      setLoading(false);
      return false;
    }

    setTokenState(storedToken);
    setUserState(tokenService.getUser());
    setLoading(false);
    return true;
  }, []);

  // Listen for global 401/403 API response events
  useEffect(() => {
    const handleUnauthorizedEvent = (event) => {
      const message = event?.detail?.message || 'Session expired or unauthorized access.';
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
    checkAuth();
  }, [checkAuth]);

  // Handle successful login
  const login = (authToken, userData = null) => {
    const validToken = authToken || 'mock-jwt-token-group14';
    tokenService.setToken(validToken);
    
    const decodedUser = tokenService.getUser();
    const finalUser = userData || decodedUser || { email: 'user@company.com', role: 'member', name: 'Standard Member' };
    
    tokenService.setUser(finalUser);

    setTokenState(validToken);
    setUserState(finalUser);
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
        isAuthenticated,
        authError,
        loading,
        login,
        logout,
        checkAuth,
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
