import { useState, useEffect, useCallback } from 'react';
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from '../services/taskService';

/**
 * Custom hook for task management connected to REST API
 * Handles loading, server error, and 409 Conflict optimistic concurrency states
 */
export default function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [conflictError, setConflictError] = useState(null);

    const fetchTasks = useCallback(async () => {
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
        } catch (err) {
            console.error('Error loading tasks:', err);
            setError(
                err.response?.data?.message ||
                'Unable to load tasks from server. Please check backend connection.'
            );
            setTasks([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const addTask = async (newTaskData) => {
        try {
            setError('');
            const taskToCreate = {
                ...newTaskData,
                status: newTaskData.status || newTaskData.column || 'To do',
                column: newTaskData.column || newTaskData.status || 'To do'
            };

            const createdTask = await createTask(taskToCreate);
            setTasks((prev) => [...prev, createdTask]);
            return createdTask;
        } catch (err) {
            console.error('Error creating task:', err);
            const msg = err.response?.data?.message || 'Failed to create task.';
            setError(msg);
            throw err;
        }
    };

    const editTask = async (taskId, updatedData) => {
        try {
            setError('');
            setConflictError(null);

            const currentTask = tasks.find(
                (t) => String(t.id || t._id) === String(taskId)
            );

            const payload = {
                ...(currentTask || {}),
                ...updatedData,
                // Pass version field if present for optimistic concurrency control (Member 5)
                baseVersion: currentTask?.version !== undefined ? currentTask.version : currentTask?.__v
            };

            const updatedTask = await updateTask(taskId, payload);

            setTasks((prev) =>
                prev.map((t) =>
                    String(t.id || t._id) === String(taskId) ? updatedTask : t
                )
            );
            return updatedTask;
        } catch (err) {
            console.error('Error updating task:', err);
            if (err.response?.status === 409) {
                // 409 Conflict handling for optimistic concurrency
                const conflictData = err.response?.data;
                setConflictError({
                    taskId,
                    message: conflictData?.message || 'Conflict detected: Task was modified by another user.',
                    serverTask: conflictData?.currentTask || conflictData?.serverTask || null
                });
            } else {
                const msg = err.response?.data?.message || 'Failed to update task.';
                setError(msg);
            }
            throw err;
        }
    };

    const removeTask = async (taskId) => {
        try {
            setError('');
            await deleteTask(taskId);
            setTasks((prev) =>
                prev.filter((t) => String(t.id || t._id) !== String(taskId))
            );
        } catch (err) {
            console.error('Error deleting task:', err);
            const msg = err.response?.data?.message || 'Failed to delete task.';
            setError(msg);
            throw err;
        }
    };

    const moveTaskStatus = async (taskId, newStatus) => {
        return editTask(taskId, {
            status: newStatus,
            column: newStatus
        });
    };

    const changeTaskMember = async (taskId, newMember) => {
        return editTask(taskId, {
            assignedTo: newMember,
            member: newMember
        });
    };

    const clearConflictError = () => {
        setConflictError(null);
    };

    return {
        tasks,
        loading,
        error,
        conflictError,
        fetchTasks,
        addTask,
        editTask,
        removeTask,
        moveTaskStatus,
        changeTaskMember,
        clearConflictError,
        setError
    };
}
