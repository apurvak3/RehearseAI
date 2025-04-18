// Home.jsx - Improved
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { Mic, FileText, Volume2, Upload, Play, Award, ArrowRight, Zap, Sparkles } from 'lucide-react';

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Master Your Script with <span className="highlight">RehearseAI</span></h1>
          <p className="subtitle">The ultimate tool for actors, speakers, and presenters to perfect their performance through AI-powered rehearsal and feedback</p>
          <div className="cta-buttons">
            <Link to="/upload" className="cta-button primary large">
              <Upload size={20} />
              Upload Script
            </Link>
            <Link to="/transcriber" className="cta-button secondary">
              <Mic size={18} />
              Start Recording
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/api/placeholder/600/350" alt="RehearseAI in action" />
        </div>
      </section>

      <section className="features">
        <h2>How RehearseAI Works</h2>
        
        <div className="feature-cards">
          <div className="feature-card">
            <Mic size={40} className="feature-icon" />
            <h3>Record & Transcribe</h3>
            <p>Convert your speech to text instantly with our state-of-the-art AI transcription engine</p>
            <Link to="/transcriber" className="feature-link">
              Try Transcriber
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="feature-card">
            <Volume2 size={40} className="feature-icon" />
            <h3>Realistic AI Voices</h3>
            <p>Hear your script read by professional AI voices to perfect your timing and delivery</p>
            <Link to="/tts" className="feature-link">
              Try Text to Speech
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="feature-card">
            <FileText size={40} className="feature-icon" />
            <h3>Script Management</h3>
            <p>Import scripts in various formats and organize your rehearsal workflow efficiently</p>
            <Link to="/upload" className="feature-link">
              Upload Your Script
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>Trusted by Performers Worldwide</h2>
        <div className="testimonial-slider">
          <div className="testimonial">
            <p>"RehearseAI has revolutionized how I practice my lines. The feedback is invaluable, and the AI voices help me perfect my timing. It's like having a personal acting coach available 24/7!"</p>
            <p className="testimonial-author">— Sarah J., Theater Actor</p>
          </div>
        </div>
      </section>

      <section className="get-started">
        <h2>Ready to Perfect Your Performance?</h2>
        <Link to="/upload" className="cta-button primary large">
          <Zap size={20} />
          Get Started Now
        </Link>
      </section>
    </div>
  );
}

export default Home;