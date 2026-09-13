// src/hooks/useBoardSocket.js
import { useEffect, useState } from 'react';
import { getSocket } from '../services/socket';

export const useBoardSocket = (socketInstance, boardId = 'default', refetchBoardData) => {
  const [isConnected, setIsConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const socket = socketInstance || getSocket();
    if (!socket) return;

    const handleConnect = () => {
      setIsConnected(true);
      if (boardId) {
        socket.emit('join:board', boardId);
      }
      if (refetchBoardData) {
        refetchBoardData();
      }
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handlePresence = (presence) => {
      if (presence?.userId) {
        setActiveUsers((prev) => {
          if (!prev.includes(presence.userId)) {
            return [...prev, presence.userId];
          }
          return prev;
        });
      }
    };

    const handleSyncComplete = () => {
      if (refetchBoardData) {
        refetchBoardData();
      }
    };

    // Set initial connection status
    setIsConnected(Boolean(socket.connected));

    // Join room if already connected
    if (socket.connected && boardId) {
      socket.emit('join:board', boardId);
    }

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('presence:update', handlePresence);
    socket.on('sync:complete', handleSyncComplete);

    return () => {
      if (boardId) {
        socket.emit('leave:board', boardId);
      }
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('presence:update', handlePresence);
      socket.off('sync:complete', handleSyncComplete);
    };
  }, [socketInstance, boardId, refetchBoardData]);

  return { isConnected, activeUsers };
};

export default useBoardSocket;
