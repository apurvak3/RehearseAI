import React, { useState } from 'react';
import './Transcriber.css';

function Transcriber() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    // Simulate recording and transcription
    if (!isRecording) {
      console.log("Recording started");
      // In a real app, this would start audio recording
    } else {
      console.log("Recording stopped");
      // Simulate receiving transcript
      setTimeout(() => {
        setTranscript("This is a simulated transcript of what you would say. In a real application, this text would come from the speech recognition API.");
      }, 1000);
    }
  };

  return (
    <div className="transcriber-container">
      <div className="transcriber-header">
        <span className="transcriber-icon">🎤</span>
        <h1>Speech to Text (Transcribe)</h1>
      </div>
      
      <div className="recording-section">
        <button 
          className={`recording-button ${isRecording ? 'recording' : ''}`} 
          onClick={toggleRecording}
        >
          {isRecording ? '🛑 Stop Recording' : '🎙️ Start Recording'}
        </button>
        
        {isRecording && (
          <div className="recording-indicator">
            <div className="pulse-animation"></div>
            <p>Recording in progress...</p>
          </div>
        )}
      </div>
      
      {transcript && (
        <div className="transcript-section">
          <h3>Transcript:</h3>
          <div className="transcript-box">
            {transcript}
          </div>
        </div>
      )}
    </div>
  );
}

export default Transcriber;