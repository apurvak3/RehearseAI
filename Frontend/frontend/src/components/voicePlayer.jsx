import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VoicePlayer.css';

function VoicePlayer() {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [ttsHistory, setTtsHistory] = useState([]);

  const handlePlay = async () => {
    if (!text.trim()) return;
    setIsPlaying(true);

    try {
      // 🔁 TODO: Call Eleven Labs API here
      console.log("Sending text to Eleven Labs:", text);

      // Simulate playback
      setTimeout(() => {
        setIsPlaying(false);
      }, 2000);

      // Save to history
      await axios.post('/api/history/tts', {
        userId: localStorage.getItem('userId'),
        text
      });

      setText('');
      fetchTTSHistory();
    } catch (err) {
      console.error("TTS error:", err);
      setIsPlaying(false);
    }
  };

  const fetchTTSHistory = async () => {
    try {
      const res = await axios.get('/api/history/tts', {
        params: { userId: localStorage.getItem('userId') }
      });
      setTtsHistory(res.data.history);
    } catch (err) {
      console.error("TTS history error:", err);
    }
  };

  useEffect(() => {
    fetchTTSHistory();
  }, []);

  return (
    <div className="voice-player">
      <h2>🎧 Listen to Script with AI Voice</h2>
      <textarea
        placeholder="Paste script to play"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handlePlay} disabled={isPlaying}>
        {isPlaying ? 'Playing...' : 'Play Voice'}
      </button>

      {ttsHistory.length > 0 && (
        <div className="upload-history">
          <h3>Generated Voices History</h3>
          <ul>
            {ttsHistory.map((entry, index) => (
              <li key={index}>
                <p><strong>{new Date(entry.createdAt).toLocaleString()}:</strong></p>
                <p>{entry.data}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default VoicePlayer;
