// src/hooks/useBoardSocket.js
import { useEffect } from 'react';

export const useBoardSocket = (socket, boardId, refetchBoardData) => {
  useEffect(() => {
    if (!socket || !boardId) return;

    // Join room when component mounts or board changes
    socket.emit('join:board', boardId);

    // Handle Socket.IO automatic reconnection
    const handleReconnect = () => {
      console.log('Socket reconnected! Rejoining room and refetching state...');
      socket.emit('join:board', boardId);
      
      // Refetch state because Socket.IO doesn't replay missed events automatically
      if (refetchBoardData) {
        refetchBoardData();
      }
    };

    socket.on('connect', handleReconnect);

    // Cleanup listeners when unmounting or changing boards to avoid duplicate listeners
    return () => {
      socket.emit('leave:board', boardId);
      socket.off('connect', handleReconnect);
    };
  }, [socket, boardId, refetchBoardData]);
};
