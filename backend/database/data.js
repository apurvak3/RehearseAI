// models/History.js (in case you need to update it)
const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['transcriber', 'upload', 'tts'],
    required: true
  },
  data: {
    type: String,
    required: true
  },
  summary: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('History', historySchema);
