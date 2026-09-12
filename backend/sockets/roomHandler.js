// backend/sockets/roomHandler.js
module.exports = (io, socket) => {
  // 1. Join Board Room
  socket.on('join:board', (boardId) => {
    const roomName = `board:${boardId}`;
    socket.join(roomName);
    console.log(`User ${socket.user?.id || socket.id} joined room: ${roomName}`);

    // Notify others in room about user presence
    socket.to(roomName).emit('presence:update', {
      userId: socket.user?.id,
      status: 'online'
    });
  });

  // 2. Leave Board Room
  socket.on('leave:board', (boardId) => {
    const roomName = `board:${boardId}`;
    socket.leave(roomName);
    console.log(`User left room: ${roomName}`);
  });

  // 3. Handle Reconnection / Re-sync Request
  socket.on('sync:request', async ({ boardId }) => {
    const roomName = `board:${boardId}`;
    socket.join(roomName);
    
    // Notify client to trigger a refetch of latest board state
    socket.emit('sync:complete', { boardId });
  });
};