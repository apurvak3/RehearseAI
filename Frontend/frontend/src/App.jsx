import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Transcriber from './components/Transcriber';
import VoicePlayer from './components/VoicePlayer';
import ScriptUploader from './components/ScriptUploader';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transcriber" element={<Transcriber />} />
        <Route path="/tts" element={<VoicePlayer />} />
        <Route path="/upload" element={<ScriptUploader />} />
      </Routes>
    </>
  );
}

export default App;


