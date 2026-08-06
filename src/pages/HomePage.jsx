import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Column from '../components/Column';
import TaskCard from '../components/TaskCard';
import SkeletonCard from '../components/SkeletonCard';
import CreateTaskModal from '../components/CreateTaskModal';
import SidePanel from '../components/SidePanel';
import { INITIAL_TASKS } from '../data/mockTasks';

const COLUMNS = ['To do', 'Doing', 'Done'];

// Mock history logs linked to dates
const MEMBER_HISTORY_LOGS = {
  '2026-08-01': [
    'JD created initial task wireframes.',
    'AM set up basic app routing.'
  ],
  '2026-08-03': [
    'SK resolved WebSocket connection edge cases.',
    'EL added CI/CD GitHub Actions workflow.'
  ],
  '2026-08-05': [
    'OW completed unit test suite for payment controller.',
    'NJ added team side panel, member badges, and history calendar view.'
  ]
};

export default function HomePage({ onLogout }) {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const categories = Array.from(
    new Set([
      'Design', 'Testing', 'Security', 'DevOps', 'Bugfix',
      ...tasks.map(t => t.tag || t.category || t.categoryTag).filter(Boolean)
    ])
  );

  const members = Array.from(
    new Set([
      'JD', 'AM', 'SK', 'EL', 'OW',
      ...tasks.map(t => t.assignedTo || t.member || t.assignedMember).filter(Boolean)
    ])
  );

  const handleAddTask = (newTask) => {
    const taskWithId = { ...newTask, id: Date.now() };
    setTasks((prev) => [...prev, taskWithId]);
    setIsCreateModalOpen(false);
  };

  // Simulate loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle updating task's assigned member
  const updateTaskMember = (taskId, newMember) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        String(task.id) === String(taskId)
          ? { ...task, assignedTo: newMember }
          : task
      )
    );
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        String(task.id) === String(taskId)
          ? { ...task, status: newStatus, column: newStatus }
          : task
      )
    );
  };

  // Filter tasks by search query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Side-by-Side Flex Layout: SidePanel + Main Board */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Member 6 Side Panel Component */}
        <SidePanel
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* Main Kanban Content Area */}
        <main className="board-main" style={{ flex: 1, overflowY: 'auto' }}>
          <div className="board-header">
            <h2 className="board-heading">Team board</h2>
            <button 
              className="submit-button" 
              onClick={() => setIsCreateModalOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Task
            </button>
          </div>

          {/* Member 6 Calendar History Banner */}
          {selectedDate && (
            <div className="history-banner">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)' }}>
                  Member Activity History for <span style={{ color: 'var(--tag-text-purple)' }}>{selectedDate}</span>
                </h4>
                <button
                  onClick={() => setSelectedDate(null)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '13px' }}
                >
                  ✕ Clear
                </button>
              </div>
              <ul style={{ paddingLeft: '20px', margin: 0 }}>
                {MEMBER_HISTORY_LOGS[selectedDate] ? (
                  MEMBER_HISTORY_LOGS[selectedDate].map((log, index) => (
                    <li key={index} style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      {log}
                    </li>
                  ))
                ) : (
                  <li style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    No recorded member history for this date.
                  </li>
                )}
              </ul>
            </div>
          )}

          {isCreateModalOpen && (
            <CreateTaskModal 
              categories={categories}
              members={members}
              onClose={() => setIsCreateModalOpen(false)} 
              onAddTask={handleAddTask} 
            />
          )}

          <div className="board-columns">
            {COLUMNS.map((columnName) => {
              const columnTasks = filteredTasks.filter((task) => task.column === columnName);

              return (
                <Column
                  key={columnName}
                  title={columnName}
                  count={columnTasks.length}
                  tasks={columnTasks}
                  loading={loading}
                  onAssignMember={updateTaskMember}
                  onUpdateStatus={updateTaskStatus}
                  columns={COLUMNS}
                />
              );
            })}
          </div>
        </main>
      </div>

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