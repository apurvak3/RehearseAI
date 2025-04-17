// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { Mic, FileText, Volume2, Upload, Play, Award } from 'lucide-react';

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Master Your Script with <span className="highlight">RehearseAI</span></h1>
          <p className="subtitle">The ultimate tool for actors, speakers, and presenters to perfect their performance</p>
          <div className="cta-buttons">
            <Link to="/upload" className="cta-button primary">
              <Upload size={18} />
              Upload Script
            </Link>
            <Link to="/transcriber" className="cta-button secondary">
              <Mic size={18} />
              Start Recording
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/api/placeholder/500/300" alt="RehearseAI in action" />
        </div>
      </section>

      <section className="features">
        <h2>How RehearseAI Works</h2>
        
        <div className="feature-cards">
          <div className="feature-card">
            <Mic size={36} className="feature-icon" />
            <h3>Transcribe Your Speech</h3>
            <p>Record your practice sessions and convert them to text instantly</p>
            <Link to="/transcriber" className="feature-link">Try Transcriber</Link>
          </div>
          
          <div className="feature-card">
            <Volume2 size={36} className="feature-icon" />
            <h3>Listen to AI Voices</h3>
            <p>Hear your script read by realistic AI voices to perfect your delivery</p>
            <Link to="/tts" className="feature-link">Try TTS</Link>
          </div>
          
          <div className="feature-card">
            <FileText size={36} className="feature-icon" />
            <h3>Upload Your Script</h3>
            <p>Import scripts in various formats and practice with our tools</p>
            <Link to="/upload" className="feature-link">Upload Now</Link>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>Trusted by Performers</h2>
        <div className="testimonial-slider">
          <div className="testimonial">
            <p>"RehearseAI has revolutionized how I practice my lines. The feedback is invaluable!"</p>
            <p className="testimonial-author">— Sarah J., Theater Actor</p>
          </div>
        </div>
      </section>

      <section className="get-started">
        <h2>Ready to Perfect Your Performance?</h2>
        <Link to="/upload" className="cta-button primary large">
          <Play size={20} />
          Get Started Now
        </Link>
      </section>
    </div>
  );
}

export default Home;