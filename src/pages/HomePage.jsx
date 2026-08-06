import React, { useState, useEffect } from 'react';
import Column from '../components/Column';
import TaskCard from '../components/TaskCard';
import SkeletonCard from '../components/SkeletonCard';
import CreateTaskModal from '../components/CreateTaskModal';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { INITIAL_TASKS } from '../data/mockTasks';

const COLUMNS = ['To do', 'Doing', 'Done'];

export default function HomePage({ onLogout, activePage, onNavigate }) {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
      <Header activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />

      {/* Main Kanban Content Area */}
      <main className="board-main">
        <div className="board-header">
          <h2 className="board-heading">Team board</h2>

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

      <Footer />
    </div>
  );
}