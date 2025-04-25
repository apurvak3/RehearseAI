import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './VoicePlayer.css';

function VoicePlayer() {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [ttsHistory, setTtsHistory] = useState([]);
  const audioRef = useRef(null);
  
  // Generate a temporary user ID if none exists
  const ensureUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      // Generate a temporary ID
      userId = 'temp-user-' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('userId', userId);
      console.log('Created temporary user ID:', userId);
    }
    return userId;
  };

  const handlePlay = async () => {
    if (!text.trim()) return;
    setIsPlaying(true);

    try {
      // Call your backend TTS endpoint
      const response = await axios({
        method: 'POST',
        url: '/api/tts/generate',
        data: { text },
        responseType: 'arraybuffer'
      });

      // Create audio blob and play it
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        
        audioRef.current.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl); // Clean up
        };
      }

      // Save to history
      try {
        const userId = ensureUserId();
        await axios.post('/api/history/tts', {
          userId,
          text
        });
        setText('');
        fetchTTSHistory();
      } catch (historyErr) {
        console.error("History save error:", historyErr);
        // Don't block the main flow if history saving fails
      }
    } catch (err) {
      console.error("TTS error:", err);
      setIsPlaying(false);
      alert("Failed to generate speech. Please try again later.");
    }
  };

  const fetchTTSHistory = async () => {
    try {
      const userId = ensureUserId();
      
      const res = await axios.get('/api/history/tts', {
        params: { userId }
      });
      
      // Make sure we're setting an array, even if the API returns something unexpected
      setTtsHistory(Array.isArray(res.data.history) ? res.data.history : []);
    } catch (err) {
      console.error("TTS history error:", err);
      setTtsHistory([]); // Set to empty array on error
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
      
      {/* Hidden audio element to play the TTS audio */}
      <audio ref={audioRef} style={{ display: 'none' }} />

      {ttsHistory && ttsHistory.length > 0 && (
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
