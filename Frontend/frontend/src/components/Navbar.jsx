import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <span className="logo-icon">🎤</span>
          <span className="logo-text">RehearseAI</span>
        </Link>
      </div>
      
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className={`hamburger-line ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
        <div className={`hamburger-line ${menuOpen ? 'opacity-0' : ''}`}></div>
        <div className={`hamburger-line ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
      </div>
      
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/" className={isActive('/')} onClick={closeMenu}>Home</Link></li>
        <li><Link to="/transcriber" className={isActive('/transcriber')} onClick={closeMenu}>Transcriber</Link></li>
        <li><Link to="/tts" className={isActive('/tts')} onClick={closeMenu}>TTS</Link></li>
        <li><Link to="/upload" className={isActive('/upload')} onClick={closeMenu}>Upload Script</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
