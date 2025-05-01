const express = require('express');
const router = express.Router();
const { generateSpeech } = require('../controllers/ttsController');

// POST /api/tts/generate
router.post('/generate', generateSpeech);

module.exports = router;
