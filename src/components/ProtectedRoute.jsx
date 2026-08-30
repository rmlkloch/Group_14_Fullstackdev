import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';

/**
 * ProtectedRoute component for route guarding and role-based authorization.
 * Supports both standalone children or React Router nested Outlet routes.
 */
export default function ProtectedRoute({ 
  children, 
  allowedRoles = null,
  fallbackComponent: Fallback = LoginPage 
}) {
  const { isAuthenticated, loading, authError, checkAuth, user, hasRole } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return (
      <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#64748b' }}>
        <p>Verifying authentication...</p>
      </div>
    );
  }

  // If user is not authenticated or token is invalid/expired
  if (!isAuthenticated) {
    // If using React Router context, return Navigate component
    return (
      <div className="protected-route-unauthorized">
        {authError && (
          <div className="auth-alert-banner" style={{
            backgroundColor: '#fef2f2',
            color: '#991b1b',
            border: '1px solid #fecaca',
            padding: '12px 20px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            ⚠️ {authError}
          </div>
        )}
        {Fallback ? <Fallback /> : <Navigate to="/login" replace />}
      </div>
    );
  }

  // Role-based Authorization Check
  if (allowedRoles && !hasRole(allowedRoles)) {
    return (
      <div className="access-denied-container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        textAlign: 'center',
        padding: '24px'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚫</div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>Access Denied</h2>
        <p style={{ color: '#64748b', maxWidth: '400px', marginBottom: '16px' }}>
          You do not have permission to view this page. Required role: <strong>{Array.isArray(allowedRoles) ? allowedRoles.join(', ') : allowedRoles}</strong>.
        </p>
        <span style={{ fontSize: '13px', color: '#94a3b8' }}>Logged in as: {user?.email} ({user?.role || 'member'})</span>
      </div>
    );
  }

  // Render protected layout outlet or children
  return children ? children : <Outlet />;
}

/**
 * Role-Based UI Guard Component (HasRole)
 * Conditionally renders UI elements based on user role.
 */
export const HasRole = ({ role, children }) => {
  const { hasRole } = useAuth();
  if (!hasRole(role)) return null;
  return children;
};
