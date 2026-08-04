import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="task-card-header">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
          <div className="skeleton-line skeleton-title-1" />
          <div className="skeleton-line skeleton-title-2" />
        </div>
      </div>
      <div className="skeleton-line skeleton-tag" />
      <div className="skeleton-footer">
        <div className="skeleton-line skeleton-avatar" />
        <div className="skeleton-line skeleton-arrows" />
      </div>
    </div>
  );
}
