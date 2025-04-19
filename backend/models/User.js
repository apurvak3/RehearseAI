const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: String,
  type: String, // 'transcriber', 'upload', 'tts'
  data: String,
  summary: String, // AI summary (optional)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);

