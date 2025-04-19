const express = require('express');
const router = express.Router();
const History = require('../models/History');
const { summarizeText } = require('../controllers/aiController');

router.post('/transcriber', async (req, res) => {
  try {
    const { userId, text } = req.body;
    
    const summary = await summarizeText(text); // AI summary

    const newEntry = new History({
      userId,
      type: 'transcriber',
      data: text,
      summary,
      createdAt: new Date()
    });
    await newEntry.save();

    res.status(200).json({ message: "Saved with summary", summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Upload script
router.post('/upload', async (req, res) => {
    try {
      const { userId, text } = req.body;
  
      const newEntry = new History({
        userId,
        type: 'upload',
        data: text,
        createdAt: new Date()
      });
  
      await newEntry.save();
      res.status(200).json({ message: "Script uploaded successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get upload history
  router.get('/upload', async (req, res) => {
    try {
      const { userId } = req.query;
  
      const history = await History.find({ userId, type: 'upload' }).sort({ createdAt: -1 });
      res.status(200).json({ history });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  // Save TTS request
router.post('/tts', async (req, res) => {
    try {
      const { userId, text } = req.body;
  
      const newEntry = new History({
        userId,
        type: 'tts',
        data: text,
        createdAt: new Date()
      });
  
      await newEntry.save();
      res.status(200).json({ message: "TTS history saved" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get TTS history
  router.get('/tts', async (req, res) => {
    try {
      const { userId } = req.query;
  
      const history = await History.find({ userId, type: 'tts' }).sort({ createdAt: -1 });
      res.status(200).json({ history });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  

module.exports = router;
