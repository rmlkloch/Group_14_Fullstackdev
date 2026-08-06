import React from 'react';

export default function Header({ activePage, onNavigate, onLogout }) {
  const navLinks = [
    { key: 'board', label: 'Board' },
    { key: 'reports', label: 'Reports' },
    { key: 'settings', label: 'Settings' },
  ];

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">K</div>
        <h1 className="navbar-title">Kanban Flow</h1>

        <nav className="navbar-nav">
          {navLinks.map((link) => (
            <button
              key={link.key}
              className={`nav-link ${activePage === link.key ? 'nav-link-active' : ''}`}
              onClick={() => onNavigate(link.key)}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="navbar-actions">
        <button className="icon-btn" title="Notifications" aria-label="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="badge-dot"></span>
        </button>

        <div className="user-profile" onClick={onLogout} title="Click to Sign Out">
          <div className="profile-avatar">AM</div>
          <div className="profile-info">
            <span className="profile-name">Alex Mercer</span>
            <button className="logout-btn">Sign Out</button>
          </div>
        </div>
      </div>
    </header>
  );
}