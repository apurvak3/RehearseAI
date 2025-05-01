const express = require('express');
const router = express.Router();
const { transcribeAudio } = require('../controllers/whisperController');

// POST /api/whisper/transcribe
router.post('/transcribe', transcribeAudio);

module.exports = router;


