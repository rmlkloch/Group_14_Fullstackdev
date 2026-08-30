import React, { useState } from 'react';
import mockTokens from '../services/mockJwt';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showTestPanel, setShowTestPanel] = useState(false);

  const validate = () => {
    let isValid = true;
    
    if (!email) {
      setEmailError('Email address is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Generate valid JWT token for standard login
      const jwtToken = mockTokens.validMember();
      const userData = { email, role: 'member', name: email.split('@')[0] };
      onLoginSuccess(jwtToken, userData);
    }
  };

  // Helper for Member 6 auth testing
  const handleTestTokenLogin = (tokenGenerator, role = 'member', name = 'Test User') => {
    const jwt = tokenGenerator();
    onLoginSuccess(jwt, { email: `${role}@company.com`, role, name });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">K</div>
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to manage your team tasks</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="email-input">Email Address</label>
            <input
              id="email-input"
              type="email"
              className="form-input"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              autoComplete="email"
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password-input">Password</label>
            <input
              id="password-input"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError('');
              }}
              autoComplete="current-password"
            />
            {passwordError && <span className="error-message">{passwordError}</span>}
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        {/* Member 6 Auth Testing Toolbar */}
        <div style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '12px', textAlign: 'center' }}>
          <button 
            type="button"
            onClick={() => setShowTestPanel(!showTestPanel)}
            style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {showTestPanel ? 'Hide Member 6 Testing Toolbar' : '🧪 Member 6 Auth Testing Toolbar'}
          </button>

          {showTestPanel && (
            <div style={{ marginTop: '10px', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
              <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Test Auth Scenarios:</p>
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

                <button
                  type="button"
                  onClick={() => handleTestTokenLogin(mockTokens.corrupted, 'member', 'Corrupted User')}
                  style={{ padding: '6px 10px', fontSize: '11px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Test Invalid JWT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
