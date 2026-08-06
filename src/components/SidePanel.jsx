import React, { useState } from 'react';

export default function SidePanel({ selectedDate, onSelectDate }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // Team members list
  const teamMembers = [
    { id: 'JD', name: 'John Doe', role: 'Design' },
    { id: 'AM', name: 'Alex Mercer', role: 'Security' },
    { id: 'SK', name: 'Sarah Khan', role: 'Bugfix' },
    { id: 'EL', name: 'Emma Louis', role: 'DevOps' },
    { id: 'OW', name: 'Oliver Wright', role: 'Testing' },
    { id: 'NJ', name: 'Newton James', role: 'DevOps' },
  ];

  return (
    <aside className={`side-panel ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Header & Collapse Toggle Button */}
      <div className="side-panel-header">
        {!isCollapsed && <h3 className="side-panel-title">Team Members</h3>}
        <button
          className="toggle-panel-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand Side Panel' : 'Collapse Side Panel'}
          aria-label="Toggle panel"
        >
          {isCollapsed ? '▶' : '◀'}
        </button>
      </div>

      <div className="side-panel-content">
        {/* Team Member List (Shows avatars in both expanded & collapsed modes) */}
        <div className="member-list-section">
          <ul className="member-list">
            {teamMembers.map((member) => (
              <li 
                key={member.id} 
                className="member-item"
                title={isCollapsed ? `${member.name} (${member.role})` : ''}
              >
                <div className="avatar-circle">{member.id}</div>
                {!isCollapsed && (
                  <div className="member-info-text">
                    <span className="member-name-text">{member.name}</span>
                    <span className="member-role-text">{member.role}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* History & Calendar Section (Shows icon in both modes) */}
        <div className="history-widget-section">
          <button
            className="history-toggle-btn"
            onClick={() => {
              setShowCalendar(!showCalendar);
              // Auto-expand sidebar if calendar is clicked while collapsed
              if (isCollapsed) setIsCollapsed(false);
            }}
            title="Member History & Calendar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {!isCollapsed && <span>Member History</span>}
          </button>

          {showCalendar && !isCollapsed && (
            <div className="calendar-box">
              <label htmlFor="history-date-picker" className="form-label" style={{ fontSize: '12px', marginTop: '8px' }}>
                Filter History by Date:
              </label>
              <input
                id="history-date-picker"
                type="date"
                className="form-input"
                style={{ padding: '8px', fontSize: '13px', width: '100%', cursor: 'pointer' }}
                value={selectedDate || ''}
                onChange={(e) => onSelectDate(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}