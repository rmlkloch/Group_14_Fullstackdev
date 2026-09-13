const dotenv = require('dotenv');
const dns = require('dns');
const connectDB = require('./config/database');
const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config();

// Custom DNS fallback
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (dnsErr) {
  console.warn('Unable to set custom DNS servers:', dnsErr.message);
}

// Initialize database connection (Skip during tests to allow in-memory DB)
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

const PORT = process.env.PORT || 5000;

// ==========================================
// M5: SOCKET.IO REAL-TIME ARCHITECTURE
// ==========================================
const server = http.createServer(app);

// 1. Attach Socket.IO to the HTTP server and configure CLIENT_ORIGIN
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// 2. Make the Socket.IO instance available to REST controllers via req.app.get('io')
app.set('io', io);

// 3. Authenticate the Socket.IO handshake using the existing JWT
io.use((socket, next) => {
  // Read token securely from the auth payload, NOT query parameters
  const token = socket.handshake.auth?.token;
  
  if (!token) {
    return next(new Error('Authentication error: Token missing'));
  }
  
  try {
    // Verify the JWT before accepting the connection
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded; // Attach decoded user info to the socket
    next(); // Accept the connection
  } catch (err) {
    return next(new Error('Authentication error: Invalid or expired token'));
  }
});

// 4. Implement main connection handling and event structure
io.on('connection', (socket) => {
  console.log(`🟢 Real-time connection established: User ID ${socket.user.id}`);

  // Member 2 & 3 will add specific event listeners (task:created, rooms) here later

  socket.on('disconnect', () => {
    console.log(`🔴 User disconnected: ${socket.user.id}`);
  });
});

// Only listen to the port if we are NOT running Jest tests
if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app for Supertest
module.exports = app;