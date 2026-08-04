import React from 'react';

export default function Column({ title, count = 0, children }) {
  return (
    <div className="column-wrapper">
      <div className="column-header">
        <div className="column-title-box">
          <h3 className="column-title">{title}</h3>
          <span className="column-badge">{count}</span>
        </div>
        <button className="column-dots" title="Column actions" aria-label="Column actions">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>
      </div>

      <div className="column-cards-container" style={{ marginBottom: '0px' }}>
        {children}
      </div>
    </div>
  );
}
