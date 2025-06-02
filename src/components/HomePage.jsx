import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import './HomePage.css';

function HomePage() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const navigate = useNavigate();

  const bookQuotes = [
    "📚 A room without books is like a body without a soul",
    "✨ Reading is dreaming with open eyes", 
    "🌟 Books are a uniquely portable magic",
    "💫 The more that you read, the more you will know"
  ];

  const featuredGenres = [
    { name: "ACTION", icon: "⚔️", color: "action" },
    { name: "FANTASY", icon: "🐉", color: "fantasy" },
    { name: "ROMANCE", icon: "💕", color: "romance" },
    { name: "FICTION", icon: "📚", color: "fiction" },
    { name: "KIDS", icon: "🎈", color: "kids" },
    { name: "SUSPENSE", icon: "🔍", color: "suspense" }
  ];

  const stats = [
    { label: "BOOKS AVAILABLE", value: "10,000+", icon: "📖" },
    { label: "HAPPY READERS", value: "5,000+", icon: "😊" },
    { label: "GENRES", value: "50+", icon: "🎯" },
    { label: "NEW ARRIVALS", value: "100+", icon: "✨" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % bookQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleStartReading = () => {
    navigate('/dashboard');
  };

  return (
    <div className="homepage-container">
      {/* Floating decorative elements */}
      <div className="float-decoration float-1"></div>
      <div className="float-decoration float-2"></div>
      <div className="float-decoration float-3"></div>
      <div className="float-decoration float-4"></div>
      <div className="float-decoration float-5"></div>
      <div className="float-decoration float-6"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-title-container">
            <h1 className="hero-title">
              <span className="title-line">◆ WELCOME TO ◆</span>
              <span className="title-main">PIXEL LIBRARY</span>
              <span className="title-sub">░▒▓ DIGITAL WONDERLAND ▓▒░</span>
            </h1>
          </div>

          <div className="quote-container">
            <div className="quote-box">
              <p className="quote-text">{bookQuotes[currentQuote]}</p>
              <div className="quote-indicators">
                {bookQuotes.map((_, index) => (
                  <div 
                    key={index} 
                    className={`quote-dot ${index === currentQuote ? 'active' : ''}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-buttons">
            <Button className="pixel-button primary-button" onClick={handleStartReading}>
              🎮 START READING
            </Button>
            <Button className="pixel-button secondary-button">
              📚 BROWSE BOOKS
            </Button>
          </div>
        </div>

        <div className="hero-decoration">
          <div className="book-stack">
            <div className="book book-1">📕</div>
            <div className="book book-2">📗</div>
            <div className="book book-3">📘</div>
            <div className="book book-4">📙</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        className={`stats-section ${isVisible.stats ? 'animate-in' : ''}`}
        id="stats"
        data-animate
      >
        <div className="section-header">
          <h2 className="section-title">◊ LIBRARY STATS ◊</h2>
        </div>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Genres Section */}
      <section 
        className={`genres-section ${isVisible.genres ? 'animate-in' : ''}`}
        id="genres"
        data-animate
      >
        <div className="section-header">
          <h2 className="section-title">◊ EXPLORE GENRES ◊</h2>
          <p className="section-subtitle">Choose your adventure!</p>
        </div>
        <div className="genres-grid">
          {featuredGenres.map((genre, index) => (
            <div key={index} className={`genre-card ${genre.color}`}>
              <div className="genre-icon">{genre.icon}</div>
              <div className="genre-name">{genre.name}</div>
              <div className="genre-hover-effect"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section 
        className={`features-section ${isVisible.features ? 'animate-in' : ''}`}
        id="features"
        data-animate
      >
        <div className="section-header">
          <h2 className="section-title">◊ WHY CHOOSE US? ◊</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3 className="feature-title">FAST ACCESS</h3>
            <p className="feature-description">Lightning speed book discovery and instant reading</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">SMART SEARCH</h3>
            <p className="feature-description">AI-powered recommendations just for you</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌟</div>
            <h3 className="feature-title">PREMIUM QUALITY</h3>
            <p className="feature-description">Curated collection of top-rated books</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Reading Journey?</h2>
          <p className="cta-subtitle">Join thousands of book lovers in our digital library!</p>
          <div className="cta-buttons">
            <Button className="pixel-button cta-primary" onClick={handleStartReading}>
              🎮 JOIN NOW
            </Button>
            <Button className="pixel-button cta-secondary">
              📖 LEARN MORE
            </Button>
          </div>
        </div>
      </section>

      {/* Footer decoration */}
      <div className="footer-decoration">
        <div className="decoration-line"></div>
        <span className="decoration-text">◊ ◊ ◊ HAPPY READING ◊ ◊ ◊</span>
        <div className="decoration-line"></div>
      </div>
    </div>
  );
}

export default HomePage; 