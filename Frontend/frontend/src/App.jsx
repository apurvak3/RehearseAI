import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Transcriber from './components/Transcriber';
import VoicePlayer from './components/VoicePlayer';
import ScriptUploader from './components/ScriptUploader';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
       
      <Routes>
  <Route path="/" element={<Home />} /> {/* Home accessible to all */}

 /**
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  */ 

  <Route path="/transcriber" element={
    <Transcriber />
  } />
  <Route path="/tts" element={
    <VoicePlayer />
  } />
  <Route path="/upload" element={
    <ScriptUploader />
  } />
</Routes>

    
    </>
  );
}

export default App;


