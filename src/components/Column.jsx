import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TaskCard from './TaskCard';
import SkeletonCard from './SkeletonCard';

export default function Column({ 
  title, 
  count = 0, 
  tasks = [], 
  loading = false,
  onAssignMember, 
  onUpdateStatus,
  onMoveTask,
  onStatusChange,
  onDeleteTask,
  onDelete,
  columns = ['To do', 'Doing', 'Done'],
  children 
}) {
  const handleUpdateStatus = onUpdateStatus || onMoveTask || onStatusChange;
  const handleDelete = onDeleteTask || onDelete;

  const [dragCounter, setDragCounter] = useState(0);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragCounter((prev) => prev + 1);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragCounter((prev) => Math.max(0, prev - 1));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragCounter(0);
    try {
      const taskId = e.dataTransfer.getData('text/plain');
      if (taskId && handleUpdateStatus) {
        handleUpdateStatus(taskId, title);
      }
    } catch (error) {
      console.error('Error handling task drop:', error);
    }
  };

  const isDragOver = dragCounter > 0;

  return (
    <div 
      className={`column-wrapper ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
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
        {loading ? (
          <>
            {children || (
              <>
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}
          </>
        ) : tasks && tasks.length > 0 ? (
          <>
            {tasks.map((task) => {
              const currentCol = task.column || task.status;
              const colIndex = columns.indexOf(currentCol);
              const canMoveLeft = colIndex > 0;
              const canMoveRight = colIndex < columns.length - 1;

              const handleMoveLeft = (taskId) => {
                if (canMoveLeft && handleUpdateStatus) {
                  handleUpdateStatus(taskId, columns[colIndex - 1]);
                }
              };

              const handleMoveRight = (taskId) => {
                if (canMoveRight && handleUpdateStatus) {
                  handleUpdateStatus(taskId, columns[colIndex + 1]);
                }
              };

              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  onAssignMember={onAssignMember}
                  canMoveLeft={canMoveLeft}
                  canMoveRight={canMoveRight}
                  onMoveLeft={handleMoveLeft}
                  onMoveRight={handleMoveRight}
                  onDelete={handleDelete}
                />
              );
            })}
            {isDragOver && (
              <div className="task-card-placeholder">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Drop task here</span>
              </div>
            )}
          </>
        ) : (
          <>
            {children}
            {isDragOver && (
              <div className="task-card-placeholder">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Drop task here</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

Column.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
  tasks: PropTypes.array,
  loading: PropTypes.bool,
  onAssignMember: PropTypes.func,
  onUpdateStatus: PropTypes.func,
  onMoveTask: PropTypes.func,
  onStatusChange: PropTypes.func,
  onDeleteTask: PropTypes.func,
  onDelete: PropTypes.func,
  columns: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
};