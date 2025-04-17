import React, { useState } from 'react';
import './ScriptUploader.css';

function ScriptUploader() {
  const [script, setScript] = useState('');

  return (
    <div className="uploader">
      <h2>Upload or Paste Script</h2>
      <textarea
        placeholder="Paste your script here..."
        value={script}
        onChange={(e) => setScript(e.target.value)}
      />
    </div>
  );
}

export default ScriptUploader;
