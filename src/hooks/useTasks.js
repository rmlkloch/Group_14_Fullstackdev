import { useState, useEffect, useCallback } from 'react';
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from '../services/taskService';
import { getSocket, initSocket } from '../services/socket';

/**
 * Custom hook for task management connected to REST API & real-time Socket.IO sync
 * Handles loading, server error, 409 Conflict optimistic concurrency, and live multi-user sync
 */
export default function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [conflictError, setConflictError] = useState(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const data = await getTasks();

            let fetchedList = [];
            if (Array.isArray(data)) {
                fetchedList = data;
            } else if (Array.isArray(data?.tasks)) {
                fetchedList = data.tasks;
            }

            setTasks(fetchedList);
            localStorage.setItem('syncboard_tasks', JSON.stringify(fetchedList));
        } catch (err) {
            console.error('Error loading tasks:', err);
            setError(
                err.response?.data?.message ||
                'Unable to load tasks from server. Showing local cache.'
            );
            const cached = localStorage.getItem('syncboard_tasks');
            if (cached) {
                try {
                    setTasks(JSON.parse(cached));
                } catch (e) {
                    setTasks([]);
                }
            } else {
                setTasks([]);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    // ==========================================
    // M5: REAL-TIME SOCKET.IO EVENT LISTENERS
    // ==========================================
    useEffect(() => {
        const socket = initSocket() || getSocket();
        if (!socket) return;

        const onConnect = () => setIsSocketConnected(true);
        const onDisconnect = () => setIsSocketConnected(false);

        const onTaskCreated = (newTask) => {
            if (!newTask) return;
            setTasks((prev) => {
                const exists = prev.some(
                    (t) => String(t.id || t._id) === String(newTask.id || newTask._id)
                );
                if (exists) return prev;
                return [...prev, newTask];
            });
        };

        const onTaskUpdated = (updatedTask) => {
            if (!updatedTask) return;
            setTasks((prev) =>
                prev.map((t) =>
                    String(t.id || t._id) === String(updatedTask.id || updatedTask._id)
                        ? { ...t, ...updatedTask }
                        : t
                )
            );
        };

        const onTaskDeleted = (deletedTask) => {
            if (!deletedTask) return;
            const targetId = typeof deletedTask === 'object'
                ? (deletedTask.id || deletedTask._id)
                : deletedTask;

            setTasks((prev) =>
                prev.filter((t) => String(t.id || t._id) !== String(targetId))
            );
        };

        const onBoardUpdated = () => {
            // Re-fetch tasks silently when board-level changes occur
            fetchTasks();
        };

        setIsSocketConnected(Boolean(socket.connected));

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('task:created', onTaskCreated);
        socket.on('task:updated', onTaskUpdated);
        socket.on('task:deleted', onTaskDeleted);
        socket.on('board:updated', onBoardUpdated);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('task:created', onTaskCreated);
            socket.off('task:updated', onTaskUpdated);
            socket.off('task:deleted', onTaskDeleted);
            socket.off('board:updated', onBoardUpdated);
        };
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
        isSocketConnected,
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
