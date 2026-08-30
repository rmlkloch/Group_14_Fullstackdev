import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

function AppContent() {
  const { user, logout, loading } = useAuth();
  const [authView, setAuthView] = useState('login'); // 'login' or 'register'

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0f172a', color: '#fff' }}>
        Loading session...
      </div>
    );
  }

  if (user) {
    return <HomePage onLogout={logout} />;
  }

  return authView === 'login' ? (
    <LoginPage onSwitchToRegister={() => setAuthView('register')} />
  ) : (
    <RegisterPage
      onRegisterSuccess={() => setAuthView('login')}
      onSwitchToLogin={() => setAuthView('login')}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}