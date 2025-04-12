const express = require("express");
const axios = require("axios");
const multer = require("multer");
const router = express.Router();
const FormData = require("form-data");
const fs = require("fs");

// Configure Multer for audio uploads
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("audio"), async (req, res) => {
  try {
    const audioFile = req.file;

    const formData = new FormData();
    formData.append("file", fs.createReadStream(audioFile.path));
    formData.append("model", "whisper-1");

    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${process.env.WHISPER_API_KEY}`,
        },
      }
    );

    res.json({ transcription: response.data.text });

    // Clean up uploaded file
    fs.unlinkSync(audioFile.path);

  } catch (error) {
    console.error("STT Error:", error);
    res.status(500).send("Error transcribing audio.");
  }
});

module.exports = router;
