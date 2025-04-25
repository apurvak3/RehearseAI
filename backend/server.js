const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const ttsRoutes = require('./routes/tts');
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',   // ✅ Only allow this origin
  credentials: true                  // ✅ Allow cookies, headers, etc.
}));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/whisper', require('./routes/whisper'));
app.use('/api/history', require('./routes/history'));
app.use('/api/tts', ttsRoutes);
console.log("Whisper route loaded");


app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
