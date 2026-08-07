import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function TaskCard({
  task,
  canMoveLeft = false,
  canMoveRight = false,
  onMoveLeft,
  onMoveRight,
  onDelete,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Destructure task properties with fallbacks
  const { 
    id, 
    title = 'Untitled Task', 
    description = '',
    tag = 'General', 
    assignedTo = 'Unassigned', 
    dueDate = '',
    column 
  } = task || {};
  
  const tagClass = `tag-${tag.toLowerCase()}`;
  const isDone = column === 'Done';

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', String(id));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div 
        className={`task-card ${isDragging ? 'dragging' : ''}`} 
        onClick={handleCardClick}
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="task-card-header">
          <span className={`tag-badge ${tagClass}`}>{tag}</span>
          {dueDate && <span className="due-date-badge">{dueDate}</span>}
        </div>
        
        <h4 className="task-card-title">{title}</h4>
        
        <div className="task-card-footer">
          <div className="task-member member-dropdown-container">
            {isDone ? (
              <div 
                className="avatar-checkmark" 
                title="Task Completed"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            ) : (
              <div 
                className="avatar-circle" 
                title={`Assigned to ${assignedTo}`}
              >
                {assignedTo}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              className="arrow-btn"
              style={{ color: 'var(--text-secondary)' }}
              onClick={(e) => {
                e.stopPropagation();
                if (onDelete) onDelete(id);
              }}
              title="Delete task"
              aria-label="Delete task"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
            
            {(canMoveLeft || canMoveRight) && (
              <div className="task-nav-arrows">
                <button
                  className="arrow-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (canMoveLeft && onMoveLeft) onMoveLeft(id);
                  }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    if (canMoveRight && onMoveRight) onMoveRight(id);
                  }}
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
      </div>

      {/* Full Detail Modal */}
      {isModalOpen && (
        <div className="task-modal-overlay" onClick={closeModal}>
          <div className="task-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="task-modal-header">
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className={`tag-badge ${tagClass}`}>{tag}</span>
                {dueDate && <span className="due-date-badge">{dueDate}</span>}
              </div>
              <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <h2 className="modal-title" style={{ fontSize: '24px', fontWeight: 'bold' }}>{title}</h2>
            
            <div className="modal-body">
              <div className="modal-section">
                <h4 className="modal-section-title">Description</h4>
                <p className="task-description">
                  {description || 'No description provided for this task.'}
                </p>
              </div>

              <div className="modal-section" style={{ marginTop: '24px' }}>
                <h4 className="modal-section-title">Assigned To</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                  <div className="avatar-circle">{assignedTo}</div>
                  <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{assignedTo}</span>
                </div>
              </div>

              <div className="modal-section" style={{ marginTop: '24px' }}>
                <h4 className="modal-section-title">Status</h4>
                <span className="column-badge" style={{ marginTop: '8px', display: 'inline-block' }}>{column}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    tag: PropTypes.string,
    assignedTo: PropTypes.string,
    dueDate: PropTypes.string,
    column: PropTypes.string,
  }).isRequired,
  canMoveLeft: PropTypes.bool,
  canMoveRight: PropTypes.bool,
  onMoveLeft: PropTypes.func,
  onMoveRight: PropTypes.func,
  onDelete: PropTypes.func,
};