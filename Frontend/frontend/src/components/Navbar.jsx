import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  
  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">
          <span className="logo-icon">🎤</span>
          <span className="logo-text">RehearseAI</span>
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/" className={isActive('/')}>Home</Link></li>
        <li><Link to="/transcriber" className={isActive('/transcriber')}>Transcriber</Link></li>
        <li><Link to="/tts" className={isActive('/tts')}>TTS</Link></li>
        <li><Link to="/upload" className={isActive('/upload')}>Upload Script</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
