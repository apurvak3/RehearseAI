const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    const voiceId = process.env.ELEVEN_LABS_VOICE_ID;

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: { stability: 0.7, similarity_boost: 0.75 },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVEN_LABS_API_KEY,
        },
      }
    );

    res.json({ audio_url: response.data.audio });

  } catch (error) {
    console.error("TTS Error:", error);
    res.status(500).send("Error generating AI voice.");
  }
});

module.exports = router;
