import React from 'react';
import Navbar from './components/Navbar'; // Navbar component
import Home from './components/Home'; // Home component
import ScriptUploader from './components/ScriptUploader'; // Script Uploader component
import Transcriber from './components/Transcriber'; // Transcriber component
import VoicePlayer from './components/VoicePlayer'; // Voice Player component

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Home />
      <ScriptUploader />
      <Transcriber />
      <VoicePlayer />
    </div>
  );
};

export default App;