const axios = require('axios');
require('dotenv').config();

exports.generateSpeech = async (req, res) => {
  const { text, emotion } = req.body;

  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVEN_LABS_VOICE_ID}`,
      {
        text,
        model_id: "eleven_multilingual_v1",
        voice_settings: {
          stability: 0.4,
          similarity_boost: 0.75,
          style: emotion || "neutral"   // 👈 Default neutral agar emotion nahi diya
        }
      },
      {
        headers: {
          "xi-api-key": process.env.ELEVEN_LABS_API_KEY,
          "Content-Type": "application/json"
        },
        responseType: 'arraybuffer'
      }
    );

    res.set({ 'Content-Type': 'audio/mpeg' });
    res.send(response.data);
  } catch (err) {
    console.error("❌ Eleven Labs TTS failed:", err.response?.data || err.message);
    res.status(500).json({ error: "TTS generation failed", details: err.message });
  }
};
