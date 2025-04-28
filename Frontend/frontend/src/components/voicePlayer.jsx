import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './VoicePlayer.css';

function VoicePlayer() {
  const [text, setText] = useState('');
  const [emotion, setEmotion] = useState('neutral');
  const [isPlaying, setIsPlaying] = useState(false);
  const [ttsHistory, setTtsHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
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
    if (!text.trim()) {
      alert("Please enter some text.");
      return;
    }
    setIsPlaying(true);

    try {
      // Call your backend TTS endpoint
      const response = await axios({
        method: 'POST',
        url: '/api/tts/generate',
        data: { text, emotion },
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
          text,
          emotion
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

  const playHistoryItem = async (historyText, historyEmotion = 'neutral') => {
    setText(historyText);
    setEmotion(historyEmotion);
    
    // Wait for state to update before playing
    setTimeout(() => {
      handlePlay();
    }, 100);
  };

  useEffect(() => {
    fetchTTSHistory();
  }, []);

  return (
    <div className="voice-player">
      <h2>🎧 Listen to Your Script with AI Voice</h2>
      <textarea
        placeholder="Paste your script here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <div className="controls-row">
        <div className="emotion-selector">
          <label>Select Emotion:</label>
          <select value={emotion} onChange={(e) => setEmotion(e.target.value)}>
            <option value="neutral">Neutral</option>
            <option value="excited">Excited</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="fearful">Fearful</option>
            <option value="friendly">Friendly</option>
            <option value="shouting">Shouting</option>
            <option value="whispering">Whispering</option>
          </select>
        </div>
        
        <button 
          className="play-button" 
          onClick={handlePlay} 
          disabled={isPlaying || !text.trim()}
        >
          {isPlaying ? '🔊 Playing...' : '▶️ Play Voice'}
        </button>
      </div>
      
      {/* Hidden audio element to play the TTS audio */}
      <audio ref={audioRef} style={{ display: 'none' }} />

      {ttsHistory && ttsHistory.length > 0 && (
        <div className="history-section">
          <button 
            className="history-toggle"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? 'Hide History' : 'Show History'} ({ttsHistory.length} items)
          </button>
          
          {showHistory && (
            <div className="history-container">
              <h3>Voice Generation History</h3>
              <ul className="history-list">
                {ttsHistory.map((entry, index) => (
                  <li key={index} className="history-item">
                    <div className="history-header">
                      <span className="history-date">
                        {new Date(entry.createdAt).toLocaleString()}
                      </span>
                      <span className="history-emotion">
                        {entry.emotion || 'neutral'}
                      </span>
                    </div>
                    <p className="history-text">{entry.data || entry.text}</p>
                    <button 
                      className="history-play"
                      onClick={() => playHistoryItem(entry.data || entry.text, entry.emotion)}
                      disabled={isPlaying}
                    >
                      ▶️ Play
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default VoicePlayer;
