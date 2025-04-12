const mongoose = require("mongoose");

const scriptSchema = new mongoose.Schema({
  userId: String,
  title: String,
  content: String,
  progress: { type: Number, default: 0 }  // Percentage of rehearsal done
}, { timestamps: true });

module.exports = mongoose.model("Script", scriptSchema);
