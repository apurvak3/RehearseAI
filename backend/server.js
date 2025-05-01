const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Routes
const whisperRoutes = require('./routes/whisper');
const ttsRoutes = require('./routes/tts');
const historyRoutes = require('./routes/history');

// App setup
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',  // ✅ Frontend origin (React)
  credentials: true                // ✅ Allow credentials (cookies, headers)
}));
app.use(express.json());            // ✅ Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // ✅ Parse URL-encoded bodies

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/whisper', whisperRoutes);
app.use('/api/tts', ttsRoutes);
app.use('/api/history', historyRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('🎤 RehearseAI Backend Running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

