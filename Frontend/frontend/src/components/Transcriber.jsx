import React, { useState, useEffect } from 'react';
import './Transcriber.css';
import { Mic, StopCircle, Copy, Download, RefreshCw } from 'lucide-react';

function Transcriber() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);

  // Timer for recording duration
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);
  
  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

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
        setTranscript("This is a simulated transcript of what you would say. In a real application, this text would come from the speech recognition API. It would capture your speech in real-time and convert it to text with high accuracy, allowing you to focus on your performance rather than taking notes.");
      }, 1000);
    }
  };

  const copyTranscript = () => {
    navigator.clipboard.writeText(transcript);
    alert("Transcript copied to clipboard!");
  };

  const resetTranscript = () => {
    setTranscript('');
  };

  const downloadTranscript = () => {
    const element = document.createElement("a");
    const file = new Blob([transcript], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="transcriber-container">
      <div className="transcriber-header">
        <span className="transcriber-icon">🎤</span>
        <div>
          <h1 className="transcriber-title">Speech to Text Transcriber</h1>
          <p className="transcriber-subtitle">Record your practice sessions and convert them to text instantly</p>
        </div>
      </div>
      
      <div className="recording-section">
        <button 
          className={`recording-button ${isRecording ? 'recording' : ''}`} 
          onClick={toggleRecording}
        >
          {isRecording ? (
            <>
              <StopCircle size={24} />
              Stop Recording
            </>
          ) : (
            <>
              <Mic size={24} />
              Start Recording
            </>
          )}
        </button>
        
        {isRecording && (
          <div className="recording-indicator">
            <div className="pulse-animation"></div>
            <div className="recording-time">{formatTime(recordingTime)}</div>
            <p className="recording-status">Recording in progress...</p>
            <div className="waveform">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="waveform-bar"></div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="transcript-section">
        <div className="transcript-header">
          <h3>Transcript</h3>
          {transcript && (
            <div className="transcript-controls">
              <button className="transcript-control-button" onClick={copyTranscript}>
                <Copy size={16} />
                Copy
              </button>
              <button className="transcript-control-button" onClick={downloadTranscript}>
                <Download size={16} />
                Download
              </button>
              <button className="transcript-control-button" onClick={resetTranscript}>
                <RefreshCw size={16} />
                Reset
              </button>
            </div>
          )}
        </div>
        <div className="transcript-box">
          {transcript ? transcript : (
            <span className="transcript-placeholder">
              Your transcript will appear here after you record something...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transcriber;