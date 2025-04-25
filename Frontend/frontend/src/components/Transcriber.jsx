import React, { useState, useEffect } from 'react';
import './Transcriber.css';
import axios from '../api/axios';
import { Mic, StopCircle, Copy, Download, RefreshCw } from 'lucide-react';

function Transcriber() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);

  // Timer update
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Time format mm:ss
  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const saveToHistory = async (text) => {
    try {
      await axios.post('/history/transcriber', {
        text,
        userId: localStorage.getItem('userId'),
      });
      console.log("✅ Saved to history");
    } catch (err) {
      console.error("❌ Error saving history", err);
    }
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('audio', blob, 'recording.webm');

        try {
          const res = await axios.post('/whisper/transcribe', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          setTranscript(res.data.text);
          saveToHistory(res.data.text);
        } catch (err) {
          console.error("❌ Transcription error:", err);
          alert("Failed to transcribe. Please try again.");
        }
      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 5000); // 30 sec max
    }
  };

  const copyTranscript = () => {
    navigator.clipboard.writeText(transcript);
    alert("📋 Transcript copied!");
  };

  const resetTranscript = () => {
    setTranscript('');
  };

  const downloadTranscript = () => {
    const blob = new Blob([transcript], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transcript.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="transcriber-container">
      <div className="transcriber-header">
        <span className="transcriber-icon">🎤</span>
        <div>
          <h1 className="transcriber-title">Speech to Text Transcriber</h1>
          <p className="transcriber-subtitle">Record your script practice and convert to text</p>
        </div>
      </div>

      <div className="recording-section">
        <button className={`recording-button ${isRecording ? 'recording' : ''}`} onClick={toggleRecording}>
          {isRecording ? <><StopCircle size={20} /> Stop</> : <><Mic size={20} /> Start</>}
        </button>

        {isRecording && (
          <div className="recording-indicator">
            <div className="pulse-animation"></div>
            <p>{formatTime(recordingTime)}</p>
            <p className="recording-status">Recording in progress...</p>
            <div className="waveform">{[...Array(9)].map((_, i) => <div key={i} className="waveform-bar" />)}</div>
          </div>
        )}
      </div>

      <div className="transcript-section">
        <div className="transcript-header">
          <h3>Transcript</h3>
          {transcript && (
            <div className="transcript-controls">
              <button onClick={copyTranscript}><Copy size={16} /> Copy</button>
              <button onClick={downloadTranscript}><Download size={16} /> Download</button>
              <button onClick={resetTranscript}><RefreshCw size={16} /> Reset</button>
            </div>
          )}
        </div>
        <div className="transcript-box">
          {transcript || <span className="transcript-placeholder">Your transcript will appear here after recording...</span>}
        </div>
      </div>
    </div>
  );
}

export default Transcriber;
