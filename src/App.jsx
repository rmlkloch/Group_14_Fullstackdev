import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

export default function App() {
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState('login'); // 'login' or 'register'

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAuthView('login');
  };

  if (user) {
    return <HomePage onLogout={handleLogout} />;
  }

  return authView === 'login' ? (
    <LoginPage
      onLoginSuccess={(userData) => setUser(userData)}
      onSwitchToRegister={() => setAuthView('register')}
    />
  ) : (
    <RegisterPage
      onRegisterSuccess={() => setAuthView('login')}
      onSwitchToLogin={() => setAuthView('login')}
    />
  );
}