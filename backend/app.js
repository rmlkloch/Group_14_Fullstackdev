const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const boardRoutes = require('./routes/boardRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/boards', boardRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

module.exports = app;
