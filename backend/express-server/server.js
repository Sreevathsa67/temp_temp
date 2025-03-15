// /backend/express-server/server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const RiskLog = require('./models/RiskLog');
// If needed: const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Simple test route
app.get('/', (req, res) => {
  res.send('Express server for proctoring is running...');
});

// Auth routes
app.use('/api/auth', authRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// Socket.IO for receiving risk logs
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  // Python app will emit "riskUpdate" every 10s
  socket.on('riskUpdate', async (data) => {
    // data = {
    //   userId, mouseRisk, keyboardRisk, appRisk, finalRisk, appsOpened
    // }
    try {
      const newLog = new RiskLog(data);
      await newLog.save();
      console.log('✅ Risk log saved for userId:', data.userId);
    } catch (err) {
      console.error('❌ Error saving risk log:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
