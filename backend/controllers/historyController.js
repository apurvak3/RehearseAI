const History = require('../models/History');

// Save new history entry
exports.saveHistory = async (req, res) => {
  const { userId, original_audio, transcript } = req.body;

  try {
    const entry = new History({ userId, original_audio, transcript });
    await entry.save();
    res.json({ success: true, entry });
  } catch (err) {
    console.error("❌ Failed to save history:", err);
    res.status(500).json({ error: "Failed to save history" });
  }
};

// Get all history for a user
exports.getHistory = async (req, res) => {
  const { userId } = req.query;

  try {
    const history = await History.find({ userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error("❌ Failed to fetch history:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};
