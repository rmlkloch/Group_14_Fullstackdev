// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

function MainApp() {
  const { isAuthenticated, loading, login, logout } = useAuth();
  const [activePage, setActivePage] = useState('board');
  const navigate = useNavigate();

  const handleLoginSuccess = (token, user) => {
    login(token, user);
    navigate('/');
  };

  const handleLogout = () => {
    logout('You have successfully logged out.');
    navigate('/login');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0f172a', color: '#fff' }}>
        Loading session...
      </div>
    );
  }

  return (
    <div className="app-container">
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage onLoginSuccess={handleLoginSuccess} />
          } 
        />
        
        <Route 
          path="/register" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage onSwitchToLogin={() => navigate('/login')} onRegisterSuccess={() => navigate('/login')} />
          } 
        />

        {/* Protected Task Board Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage 
                onLogout={handleLogout}
                activePage={activePage}
                onNavigate={setActivePage} 
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <HomePage 
                onLogout={handleLogout}
                activePage={activePage}
                onNavigate={setActivePage} 
              />
            </ProtectedRoute>
          }
        />

        {/* Admin-only Protected Route Example */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>🔒 Admin Control Panel</h2>
                <p>Protected area accessible exclusively to admin role users.</p>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}