// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import mockTokens from '../services/mockJwt';

export default function LoginPage({ onLoginSuccess, onSwitchToRegister }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTestPanel, setShowTestPanel] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password.');
      }

      // If using React Router (Member 6), onLoginSuccess is passed
      if (onLoginSuccess) {
        onLoginSuccess(data.token, data.user || { email, name: email.split('@')[0] });
      } else {
        // Fallback to direct context injection (Member 3)
        login(data.token, data.user || { email, name: email.split('@')[0] });
      }
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        console.warn('Backend server offline. Using mock login.');
        const mockToken = mockTokens.validMember();
        const mockUser = { email, role: 'member', name: email.split('@')[0] };
        
        if (onLoginSuccess) {
          onLoginSuccess(mockToken, mockUser);
        } else {
          login(mockToken, mockUser);
        }
      } else {
        setError(err.message || 'Login failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper for mock auth testing toolbar
  const handleTestTokenLogin = (tokenGenerator, role = 'member', name = 'Test User') => {
    const jwt = tokenGenerator();
    const mockUser = { email: `${role}@company.com`, role, name };
    
    if (onLoginSuccess) {
      onLoginSuccess(jwt, mockUser);
    } else {
      login(jwt, mockUser);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign In to Kanban Flow</h2>
        <p style={styles.subtitle}>Enter your credentials to access your board</p>

        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p style={styles.footerText}>
          Don't have an account?{' '}
          <button onClick={onSwitchToRegister} style={styles.linkButton}>
            Register here
          </button>
        </p>

        {/* Mock Auth Testing Toolbar */}
        <div style={{ marginTop: '20px', borderTop: '1px solid #334155', paddingTop: '12px', textAlign: 'center' }}>
          <button 
            type="button"
            onClick={() => setShowTestPanel(!showTestPanel)}
            style={{ background: 'none', border: 'none', color: '#818cf8', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {showTestPanel ? 'Hide Mock Testing Toolbar' : '🧪 Show Mock Testing Toolbar'}
          </button>

          {showTestPanel && (
            <div style={{ marginTop: '10px', background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
              <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '8px' }}>Test Auth Scenarios (No Backend):</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => handleTestTokenLogin(mockTokens.validMember, 'member', 'Member User')}
                  style={{ padding: '6px 10px', fontSize: '11px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Valid Member JWT
                </button>
                <button
                  type="button"
                  onClick={() => handleTestTokenLogin(mockTokens.validAdmin, 'admin', 'Admin User')}
                  style={{ padding: '6px 10px', fontSize: '11px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Valid Admin JWT
                </button>
                <button
                  type="button"
                  onClick={() => handleTestTokenLogin(mockTokens.expired, 'member', 'Expired User')}
                  style={{ padding: '6px 10px', fontSize: '11px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Test Expired JWT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0f172a' },
  card: { width: '100%', maxWidth: '400px', padding: '32px', backgroundColor: '#1e293b', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', color: '#fff' },
  title: { fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', textAlign: 'center' },
  subtitle: { fontSize: '14px', color: '#94a3b8', marginBottom: '24px', textAlign: 'center' },
  errorAlert: { backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', padding: '10px', borderRadius: '6px', fontSize: '14px', marginBottom: '16px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '14px', color: '#cbd5e1' },
  input: { padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#fff', fontSize: '14px' },
  button: { padding: '12px', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' },
  footerText: { marginTop: '20px', fontSize: '14px', color: '#94a3b8', textAlign: 'center' },
  linkButton: { background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline' },
};