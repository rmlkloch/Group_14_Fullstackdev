// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const dns = require('dns');
const cors = require('cors');
const connectDB = require('./config/database'); // 1. Import your new connection module

// Load environment variables
dotenv.config();

// Custom DNS fallback
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (dnsErr) {
  console.warn('Unable to set custom DNS servers:', dnsErr.message);
}

// 2. Initialize database connection using your dedicated infrastructure
connectDB();

// Route imports
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const boardRoutes = require('./routes/boardRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/boards', boardRoutes);

const healthRoutes = require('./routes/healthRoutes');
app.use('/api', healthRoutes);

// Base endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});