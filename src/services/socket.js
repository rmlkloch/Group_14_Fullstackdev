// src/services/socket.js
import { io } from 'socket.io-client';
import tokenService from './tokenService';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

let socket = null;

/**
 * Initialize or retrieve the existing Socket.IO connection
 * Sends the JWT token inside the handshake auth object as required by the backend
 */
export const initSocket = (customToken = null) => {
  const token = customToken || tokenService.getToken();

  if (!token) {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
    return null;
  }

  // If already connected with the same token, return existing socket
  if (socket && socket.connected) {
    return socket;
  }

  // Create new socket connection with JWT auth handshake
  socket = io(SOCKET_URL, {
    auth: {
      token: token
    },
    secure: SOCKET_URL.startsWith('https'),
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    autoConnect: true
  });

  socket.on('connect', () => {
    console.log('🟢 Socket.IO connected successfully with ID:', socket.id);
  });

  socket.on('connect_error', (error) => {
    console.warn('⚠️ Socket.IO connection error:', error.message);
  });

  socket.on('disconnect', (reason) => {
    console.log('🔴 Socket.IO disconnected:', reason);
  });

  return socket;
};

/**
 * Get current socket instance
 */
export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};

/**
 * Disconnect and destroy current socket
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export default {
  initSocket,
  getSocket,
  disconnectSocket
};
