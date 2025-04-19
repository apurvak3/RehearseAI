const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

router.post('/transcribe', (req, res) => {
  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "File error" });

    const audio = fs.createReadStream(files.audio.filepath);

    try {
      const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', audio, {
        headers: {
          'Authorization': `Bearer ${process.env.WHISPER_API_KEY}`,
          'Content-Type': 'multipart/form-data'
        },
        params: {
          model: 'whisper-1',
          response_format: 'text'
        }
      });

      res.json({ text: response.data });
    } catch (error) {
      res.status(500).json({ error: 'Whisper failed', details: error.message });
    }
  });
});

module.exports = router;
