import React, { useState } from 'react';
import PropTypes from 'prop-types';

const COLUMNS = ['To do', 'Doing', 'Done'];

export default function CreateTaskModal({ onClose, onAddTask, categories = [], members = [] }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState(categories[0] || '');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState(members[0] || '');
  const [column, setColumn] = useState(COLUMNS[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Title and Description are required.");
      return;
    }

    const newTask = {
      title,
      description,
      tag,
      dueDate,
      assignedTo,
      column
    };

    onAddTask(newTask);
  };

  return (
    <div className="task-modal-overlay" onClick={onClose}>
      <div className="task-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="task-modal-header">
          <h2 className="modal-title" style={{ marginBottom: 0 }}>Create New Task</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Task Title *</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g., Fix login page styling"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Description *</label>
            <textarea 
              className="form-textarea" 
              placeholder="Detailed explanation of the task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div className="form-group">
              <label className="form-label">Category Tag</label>
              <input 
                type="text" 
                list="category-options"
                className="form-input" 
                placeholder="e.g., Frontend"
                value={tag} 
                onChange={(e) => setTag(e.target.value)}
              />
              <datalist id="category-options">
                {categories.map(cat => <option key={cat} value={cat} />)}
              </datalist>
            </div>

            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g., Oct 12"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Assigned Member</label>
              <input 
                type="text" 
                list="member-options"
                className="form-input" 
                placeholder="e.g., RK"
                value={assignedTo} 
                onChange={(e) => setAssignedTo(e.target.value)}
              />
              <datalist id="member-options">
                {members.map(m => <option key={m} value={m} />)}
              </datalist>
            </div>

            <div className="form-group">
              <label className="form-label">Status Column</label>
              <select className="form-select" value={column} onChange={(e) => setColumn(e.target.value)}>
                {COLUMNS.map(col => <option key={col} value={col}>{col}</option>)}
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

CreateTaskModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  members: PropTypes.arrayOf(PropTypes.string),
};
