import React, { useState } from 'react';
import './VoicePlayer.css';

function VoicePlayer() {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    setIsPlaying(true);

    // TODO: Call Eleven Labs API here (after backend ready)
    console.log("Sending text to backend for TTS:", text);

    // Dummy timeout to simulate playback
    setTimeout(() => setIsPlaying(false), 2000);
  };

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
    </div>
  );
}

export default VoicePlayer;
