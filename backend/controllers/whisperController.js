const formidable = require('formidable');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

require('dotenv').config();

exports.transcribeAudio = (req, res) => {
  // Fixed formidable initialization
  const form = new formidable.IncomingForm({
    multiples: false,
    uploadDir: './uploads',
    keepExtensions: true
  });

  form.parse(req, async (err, fields, files) => {
    if (err || !files.audio) {
      return res.status(500).json({ error: "Audio file parsing failed", details: err });
    }

    const audioPath = files.audio.filepath || files.audio.path;
    const audioStream = fs.createReadStream(audioPath);

    try {
      const formData = new FormData();
      formData.append('file', audioStream);
      formData.append('model', 'whisper-1');
      formData.append('response_format', 'text');

      const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
        headers: {
          'Authorization': `Bearer ${process.env.WHISPER_API_KEY}`,
          ...formData.getHeaders()
        }
      });

      res.json({ text: response.data });
    } catch (error) {
      console.error("❌ Whisper transcription failed:", error.response?.data || error.message);
      res.status(500).json({ error: "Whisper transcription failed", details: error.message });
    }
  });
};
