import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ScriptUploader.css';
import { Upload, Send, Clock, RefreshCw, File } from 'lucide-react';

function ScriptUploader() {
  const [script, setScript] = useState('');
  const [uploadHistory, setUploadHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (!script.trim()) return;

    setIsLoading(true);
    try {
      await axios.post('/api/history/upload', {
        userId: localStorage.getItem('userId'),
        text: script
      });
      setScript('');
      fetchUploadHistory();
      // Show success feedback
      const successMessage = document.getElementById('upload-success');
      successMessage.style.opacity = '1';
      setTimeout(() => {
        successMessage.style.opacity = '0';
      }, 3000);
    } catch (err) {
      console.error("Upload error", err);
      // Show error feedback
      const errorMessage = document.getElementById('upload-error');
      errorMessage.style.opacity = '1';
      setTimeout(() => {
        errorMessage.style.opacity = '0';
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setScript(event.target.result);
    };
    reader.readAsText(file);
    
    // Reset the file input
    e.target.value = '';
  };

  const fetchUploadHistory = async () => {
    try {
      const res = await axios.get('/api/history/upload', {
        params: { userId: localStorage.getItem('userId') }
      });
      setUploadHistory(res.data.history);
    } catch (err) {
      console.error("Fetching history failed", err);
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
    if (!showHistory) {
      fetchUploadHistory();
    }
  };

  const clearTextarea = () => {
    setScript('');
  };

  useEffect(() => {
    fetchUploadHistory();
  }, []);

  return (
    <div className="uploader-container">
      <div className="uploader-header">
        <span className="uploader-icon">📝</span>
        <div>
          <h1 className="uploader-title">Script Uploader</h1>
          <p className="uploader-subtitle">Upload or paste your scripts for practice sessions</p>
        </div>
      </div>
      
      <div className="script-input-section">
        <div className="file-upload-area">
          <button className="file-upload-button" onClick={handleFileUpload}>
            <Upload size={20} />
            Choose File
          </button>
          <span className="file-upload-text">or paste text directly below</span>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="file-input" 
            accept=".txt,.doc,.docx,.pdf,.rtf" 
            onChange={handleFileChange}
          />
        </div>
      
        <textarea
          className="script-textarea"
          placeholder="Paste your script here or upload a file..."
          value={script}
          onChange={(e) => setScript(e.target.value)}
        />
        
        <div className="uploader-controls">
          <button 
            className="upload-button"
            onClick={handleUpload}
            disabled={isLoading || !script.trim()}
          >
            {isLoading ? (
              <>
                <RefreshCw size={20} className="loading-icon" />
                Uploading...
              </>
            ) : (
              <>
                <Send size={20} />
                Upload Script
              </>
            )}
          </button>
          
          <button className="clear-button" onClick={clearTextarea}>
            Clear
          </button>
          
          <button className="history-toggle-button" onClick={toggleHistory}>
            <Clock size={20} />
            {showHistory ? 'Hide History' : 'Show History'}
          </button>
        </div>
        
        <div id="upload-success" className="upload-notification success">
          Script uploaded successfully!
        </div>
        
        <div id="upload-error" className="upload-notification error">
          Failed to upload script. Please try again.
        </div>
      </div>
      
      {showHistory && (
        <div className="upload-history-section">
          <div className="history-header">
            <h3>Upload History</h3>
            <button className="refresh-button" onClick={fetchUploadHistory}>
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
          
          {uploadHistory.length > 0 ? (
            <div className="history-items">
              {uploadHistory.map((entry, index) => (
                <div key={index} className="history-item">
                  <div className="history-item-header">
                    <span className="history-date">
                      {new Date(entry.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="history-content">
                    {entry.data}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-history">
              No upload history found. Scripts you upload will appear here.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ScriptUploader;

