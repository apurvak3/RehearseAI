// models/TTSHistory.js
const mongoose = require('mongoose');

const TTSHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TTSHistory', TTSHistorySchema);