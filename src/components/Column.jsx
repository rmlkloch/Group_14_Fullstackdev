import React from 'react';
import PropTypes from 'prop-types';
import TaskCard from './TaskCard';
import SkeletonCard from './SkeletonCard';

export default function Column({ 
  title, 
  count = 0, 
  tasks = [], 
  loading = false,
  onAssignMember, 
  columns = ['To do', 'Doing', 'Done'],
  children 
}) {
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
        {loading ? (
          <>
            {/* Fallback to children for loaders if they exist, or use built-in skeletons */}
            {children || (
              <>
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}
          </>
        ) : tasks && tasks.length > 0 ? (
          tasks.map((task) => {
            const colIndex = columns.indexOf(task.column);
            const canMoveLeft = colIndex > 0;
            const canMoveRight = colIndex < columns.length - 1;

            return (
              <TaskCard
                key={task.id}
                task={task}
                onAssignMember={onAssignMember}
                canMoveLeft={canMoveLeft}
                canMoveRight={canMoveRight}
              />
            );
          })
        ) : (
          children
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
  columns: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
};
