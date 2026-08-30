import React, { useState, useEffect } from 'react';
import Column from '../components/Column';
import CreateTaskModal from '../components/CreateTaskModal';
import SidePanel from '../components/SidePanel';

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from '../services/api';

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
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Categories
  const categories = Array.from(
    new Set([
      'Design',
      'Testing',
      'Security',
      'DevOps',
      'Bugfix',
      ...tasks
        .map(
          (task) =>
            task.tag ||
            task.category ||
            task.categoryTag
        )
        .filter(Boolean)
    ])
  );

  // Members
  const members = Array.from(
    new Set([
      'JD',
      'AM',
      'SK',
      'EL',
      'OW',
      ...tasks
        .map(
          (task) =>
            task.assignedTo ||
            task.member ||
            task.assignedMember
        )
        .filter(Boolean)
    ])
  );

  // =====================================================
  // GET ALL TASKS
  // =====================================================

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getTasks();

        if (Array.isArray(data)) {
          setTasks(data);
        } else if (Array.isArray(data?.tasks)) {
          setTasks(data.tasks);
        } else {
          setTasks([]);
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);

        setError(
          'Unable to load tasks. Please check the server connection.'
        );

        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // =====================================================
  // CREATE TASK
  // =====================================================

  const handleAddTask = async (newTask) => {
    try {
      setError('');

      const taskToCreate = {
        ...newTask,
        status:
          newTask.status ||
          newTask.column ||
          'To do',
        column:
          newTask.column ||
          newTask.status ||
          'To do'
      };

      const createdTask = await createTask(taskToCreate);

      setTasks((prevTasks) => [
        ...prevTasks,
        createdTask
      ]);

      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Failed to create task:', error);

      setError(
        'Failed to create the task. Please try again.'
      );
    }
  };

  // =====================================================
  // DELETE TASK
  // =====================================================

  const handleDeleteTask = async (taskId) => {
    try {
      setError('');

      await deleteTask(taskId);

      setTasks((prevTasks) =>
        prevTasks.filter(
          (task) =>
            String(task.id) !== String(taskId)
        )
      );
    } catch (error) {
      console.error('Failed to delete task:', error);

      setError(
        'Failed to delete the task. Please try again.'
      );
    }
  };

  // =====================================================
  // UPDATE TASK MEMBER
  // =====================================================

  const updateTaskMember = async (
    taskId,
    newMember
  ) => {
    try {
      setError('');

      const currentTask = tasks.find(
        (task) =>
          String(task.id) === String(taskId)
      );

      if (!currentTask) {
        console.error('Task not found');
        return;
      }

      const taskData = {
        ...currentTask,
        assignedTo: newMember,
        member: newMember
      };

      const updatedTask = await updateTask(
        taskId,
        taskData
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          String(task.id) === String(taskId)
            ? updatedTask
            : task
        )
      );
    } catch (error) {
      console.error(
        'Failed to update task member:',
        error
      );

      setError(
        'Failed to update the assigned member.'
      );
    }
  };

  // =====================================================
  // UPDATE TASK STATUS
  // Drag & Drop / Move between columns
  // =====================================================

  const updateTaskStatus = async (
    taskId,
    newStatus
  ) => {
    try {
      setError('');

      const currentTask = tasks.find(
        (task) =>
          String(task.id) === String(taskId)
      );

      if (!currentTask) {
        console.error('Task not found');
        return;
      }

      const taskData = {
        ...currentTask,
        status: newStatus,
        column: newStatus
      };

      const updatedTask = await updateTask(
        taskId,
        taskData
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          String(task.id) === String(taskId)
            ? updatedTask
            : task
        )
      );
    } catch (error) {
      console.error(
        'Failed to update task status:',
        error
      );

      setError(
        'Failed to update the task status.'
      );
    }
  };

  // =====================================================
  // SEARCH / FILTER TASKS
  // =====================================================

  const filteredTasks = tasks.filter((task) => {
    const title = task.title || '';

    const category =
      task.tag ||
      task.category ||
      task.categoryTag ||
      '';

    return (
      title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      category
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="board-container">

      {/* ================= HEADER ================= */}

      <header className="navbar">

        <div className="navbar-left">
          <div className="navbar-logo">
            K
          </div>

          <h1 className="navbar-title">
            Kanban Flow
          </h1>
        </div>

        <div className="navbar-actions">

          {/* SEARCH */}

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
              <circle
                cx="11"
                cy="11"
                r="8"
              />

              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
              />
            </svg>

            <input
              type="text"
              className="search-input"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
            />
          </div>

          {/* NOTIFICATION */}

          <button
            className="icon-btn"
            title="Notifications"
            aria-label="Notifications"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />

              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>

            <span className="badge-dot" />
          </button>

          {/* USER PROFILE */}

          <div
            className="user-profile"
            onClick={onLogout}
            title="Click to Sign Out"
          >
            <div className="profile-avatar">
              AM
            </div>

            <div className="profile-info">

              <span className="profile-name">
                Alex Mercer
              </span>

              <button
                className="logout-btn"
                type="button"
              >
                Sign Out
              </button>

            </div>
          </div>

        </div>
      </header>

      {/* ================= BODY ================= */}

      <div
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden'
        }}
      >

        {/* SIDE PANEL */}

        <SidePanel
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* MAIN BOARD */}

        <main
          className="board-main"
          style={{
            flex: 1,
            overflowY: 'auto'
          }}
        >

          {/* BOARD HEADER */}

          <div className="board-header">

            <h2 className="board-heading">
              Team board
            </h2>

            <button
              className="submit-button"
              onClick={() =>
                setIsCreateModalOpen(true)
              }
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line
                  x1="12"
                  y1="5"
                  x2="12"
                  y2="19"
                />

                <line
                  x1="5"
                  y1="12"
                  x2="19"
                  y2="12"
                />
              </svg>

              Add Task
            </button>

          </div>

          {/* ================= ERROR STATE ================= */}

          {error && (
            <div
              style={{
                marginBottom: '16px',
                padding: '12px 16px',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                fontSize: '13px'
              }}
            >
              {error}
            </div>
          )}

          {/* ================= HISTORY ================= */}

          {selectedDate && (
            <div className="history-banner">

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    color: 'var(--text-primary)'
                  }}
                >
                  Member Activity History for{' '}

                  <span
                    style={{
                      color:
                        'var(--tag-text-purple)'
                    }}
                  >
                    {selectedDate}
                  </span>
                </h4>

                <button
                  onClick={() =>
                    setSelectedDate(null)
                  }
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  ✕ Clear
                </button>

              </div>

              <ul
                style={{
                  paddingLeft: '20px',
                  margin: 0
                }}
              >
                {MEMBER_HISTORY_LOGS[
                  selectedDate
                ] ? (
                  MEMBER_HISTORY_LOGS[
                    selectedDate
                  ].map((log, index) => (
                    <li
                      key={index}
                      style={{
                        fontSize: '13px',
                        color:
                          'var(--text-secondary)',
                        marginBottom: '4px'
                      }}
                    >
                      {log}
                    </li>
                  ))
                ) : (
                  <li
                    style={{
                      fontSize: '13px',
                      color:
                        'var(--text-muted)'
                    }}
                  >
                    No recorded member history for this date.
                  </li>
                )}
              </ul>

            </div>
          )}

          {/* ================= CREATE MODAL ================= */}

          {isCreateModalOpen && (
            <CreateTaskModal
              categories={categories}
              members={members}
              onClose={() =>
                setIsCreateModalOpen(false)
              }
              onAddTask={handleAddTask}
            />
          )}

          {/* ================= EMPTY STATE ================= */}

          {!loading &&
            !error &&
            tasks.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '50px 20px',
                  color: 'var(--text-muted)'
                }}
              >
                <h3
                  style={{
                    marginBottom: '8px',
                    color:
                      'var(--text-secondary)'
                  }}
                >
                  No tasks available
                </h3>

                <p
                  style={{
                    margin: 0,
                    fontSize: '14px'
                  }}
                >
                  Create a new task to get started.
                </p>
              </div>
            )}

          {/* SEARCH EMPTY STATE */}

          {!loading &&
            tasks.length > 0 &&
            filteredTasks.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '30px',
                  color: 'var(--text-muted)'
                }}
              >
                No tasks match your search.
              </div>
            )}

          {/* ================= KANBAN COLUMNS ================= */}

          <div className="board-columns">

            {COLUMNS.map((columnName) => {

              const columnTasks =
                filteredTasks.filter(
                  (task) =>
                    (
                      task.column ||
                      task.status
                    ) === columnName
                );

              return (
                <Column
                  key={columnName}
                  title={columnName}
                  count={columnTasks.length}
                  tasks={columnTasks}
                  loading={loading}

                  onAssignMember={
                    updateTaskMember
                  }

                  onMemberChange={
                    updateTaskMember
                  }

                  onUpdateStatus={
                    updateTaskStatus
                  }

                  onMoveTask={
                    updateTaskStatus
                  }

                  onStatusChange={
                    updateTaskStatus
                  }

                  onMove={
                    updateTaskStatus
                  }

                  onDeleteTask={
                    handleDeleteTask
                  }

                  onDelete={
                    handleDeleteTask
                  }

                  onDeleteCard={
                    handleDeleteTask
                  }

                  columns={COLUMNS}
                />
              );
            })}

          </div>

        </main>
      </div>

      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <span>
          © 2026 Kanban Flow
        </span>

        <div>

          <a
            href="#"
            className="footer-link"
            style={{
              marginRight: '16px'
            }}
          >
            Documentation
          </a>

          <a
            href="#"
            className="footer-link"
          >
            Support
          </a>

        </div>

      </footer>

    </div>
  );
}
