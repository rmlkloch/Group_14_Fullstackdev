import React, { useState } from 'react';

const MEMBERS = ['JD', 'AM', 'SK', 'EL', 'OW'];

export default function TaskCard({
  title,
  tag,
  tagColor = 'blue',
  member,
  isDone = false,
  showMove = false,
  onMoveLeft,
  onMoveRight,
  canMoveLeft = false,
  canMoveRight = false,
  onUpdateMember, // Callback to update member in parent state
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <span className={`tag-badge tag-${tagColor}`}>{tag}</span>
      </div>
      <h4 className="task-card-title">{title}</h4>
      <div className="task-card-footer">
        <div className="task-member member-dropdown-container">
          {isDone ? (
            <div 
              className="avatar-checkmark" 
              title="Task Completed (Click to change member)" 
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          ) : (
            <div 
              className="avatar-circle" 
              title={`Assigned to ${member} (Click to change)`}
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            >
              {member}
            </div>
          )}

          {showDropdown && onUpdateMember && (
            <>
              {/* Invisible backdrop to dismiss dropdown on click outside */}
              <div 
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 90,
                  cursor: 'default'
                }} 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(false);
                }} 
              />
              <div 
                className="member-dropdown" 
                onClick={(e) => e.stopPropagation()}
              >
                {MEMBERS.map((m) => (
                  <button
                    key={m}
                    className={`member-dropdown-item ${m === member ? 'active' : ''}`}
                    onClick={() => {
                      onUpdateMember(m);
                      setShowDropdown(false);
                    }}
                  >
                    <div className="avatar-circle" style={{ width: '18px', height: '18px', fontSize: '8px' }}>
                      {m}
                    </div>
                    <span>{m}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {showMove && (
          <div className="task-nav-arrows">
            <button
              className="arrow-btn"
              onClick={onMoveLeft}
              disabled={!canMoveLeft}
              title="Move left"
              aria-label="Move task left"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="arrow-btn"
              onClick={onMoveRight}
              disabled={!canMoveRight}
              title="Move right"
              aria-label="Move task right"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
