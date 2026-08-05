import React, { useState } from 'react';

export default function HomePage({ onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="board-container">
      {/* Top Navbar Header */}
      <header className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo">K</div>
          <h1 className="navbar-title">Kanban Flow</h1>
        </div>

        <div className="navbar-actions">
          <div className="search-container">
            <svg
              className="search-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

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

      {/* Main Content Area - Blank */}
      <main className="board-main">
      </main>

      {/* Footer bar */}
      <footer className="footer">
        <span>© 2026 Kanban Flow</span>
        <div>
          <a href="#" className="footer-link" style={{ marginRight: '16px' }}>Documentation</a>
          <a href="#" className="footer-link">Support</a>
        </div>
      </footer>
    </div>
  );
}
