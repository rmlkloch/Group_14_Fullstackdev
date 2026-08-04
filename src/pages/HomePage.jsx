import React, { useState, useEffect } from 'react';
import Column from '../components/Column';
import TaskCard from '../components/TaskCard';
import SkeletonCard from '../components/SkeletonCard';

const INITIAL_TASKS = [
  {
    id: 1,
    title: 'Design high-fidelity landing page mockup',
    tag: 'Design',
    tagColor: 'pink',
    member: 'JD',
    column: 'To do',
  },
  {
    id: 2,
    title: 'Implement OAuth2 authentication middleware',
    tag: 'Security',
    tagColor: 'purple',
    member: 'AM',
    column: 'Doing',
  },
  {
    id: 3,
    title: 'Profile & fix memory leak in WebSocket connection layer',
    tag: 'Bugfix',
    tagColor: 'orange',
    member: 'SK',
    column: 'Doing',
  },
  {
    id: 4,
    title: 'Set up automated CI/CD pipeline on Github Actions',
    tag: 'DevOps',
    tagColor: 'green',
    member: 'JD',
    column: 'Done',
  },
  {
    id: 5,
    title: 'Write comprehensive integration tests for payments controller',
    tag: 'Testing',
    tagColor: 'blue',
    member: 'EL',
    column: 'To do',
  },
];

const COLUMNS = ['To do', 'Doing', 'Done'];

export default function HomePage({ onLogout }) {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle task movements between columns
  const moveTask = (taskId, direction) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== taskId) return task;

        const currentIndex = COLUMNS.indexOf(task.column);
        let newIndex = currentIndex;

        if (direction === 'left' && currentIndex > 0) {
          newIndex = currentIndex - 1;
        } else if (direction === 'right' && currentIndex < COLUMNS.length - 1) {
          newIndex = currentIndex + 1;
        }

        return { ...task, column: COLUMNS[newIndex] };
      })
    );
  };

  // Handle updating task's assigned member
  const updateTaskMember = (taskId, newMember) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, member: newMember } : task
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

      {/* Main Kanban Content Area */}
      <main className="board-main">
        <div className="board-header">
          <h2 className="board-heading">Team board</h2>
        </div>

        <div className="board-columns">
          {COLUMNS.map((columnName) => {
            const columnTasks = filteredTasks.filter((task) => task.column === columnName);

            return (
              <Column
                key={columnName}
                title={columnName}
                count={columnTasks.length}
              >
                {/* Render loaders or tasks */}
                {loading ? (
                  <>
                    <SkeletonCard />
                    <SkeletonCard />
                  </>
                ) : (
                  columnTasks.map((task) => {
                    const colIndex = COLUMNS.indexOf(task.column);
                    return (
                      <TaskCard
                        key={task.id}
                        title={task.title}
                        tag={task.tag}
                        tagColor={task.tagColor}
                        member={task.member}
                        isDone={task.column === 'Done'}
                        showMove={true}
                        onMoveLeft={() => moveTask(task.id, 'left')}
                        onMoveRight={() => moveTask(task.id, 'right')}
                        canMoveLeft={colIndex > 0}
                        canMoveRight={colIndex < COLUMNS.length - 1}
                        onUpdateMember={(newMember) => updateTaskMember(task.id, newMember)}
                      />
                    );
                  })
                )}
              </Column>
            );
          })}
        </div>
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
