import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import Login from './Login';
import './Home.css';

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleGoToLibrary = () => {
    navigate('/dashboard');
  };

  return (
    <div className="home-container">
      {/* Floating decorative elements */}
      <div className="float-decoration float-1"></div>
      <div className="float-decoration float-2"></div>
      <div className="float-decoration float-3"></div>
      <div className="float-decoration float-4"></div>

      {/* Main content wrapper */}
      <div className="home-wrapper">
        {/* Title section */}
        <div className="home-title">
          <h1 className="title-main">◆ PIXEL BOOK LIBRARY ◆</h1>
          <p className="title-sub">░▒▓ YOUR DIGITAL READING SANCTUARY ▓▒░</p>
        </div>

        {/* Content container */}
        <div className="home-content">
          {/* Decorative corner pixels */}
          <div className="corner-pixel corner-top-left"></div>
          <div className="corner-pixel corner-top-right"></div>
          <div className="corner-pixel corner-bottom-left"></div>
          <div className="corner-pixel corner-bottom-right"></div>

          {/* Inner decorative border */}
          <div className="inner-border"></div>

          <div className="content-wrapper">
            {!isAuthenticated ? (
              <>
                {/* Welcome message */}
                <div className="welcome-section">
                  <div className="welcome-icon">📚</div>
                  <h2 className="welcome-title">Welcome to Pixel Book Library</h2>
                  <p className="welcome-text">
                    A retro-styled digital library where you can manage your book collection
                    with a touch of pixel art nostalgia. Track your favorite books, authors,
                    and ratings in a beautifully designed interface.
                  </p>
                  <div className="feature-list">
                    <div className="feature-item">
                      <span className="feature-icon">📖</span>
                      <span className="feature-text">Add and manage your books</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">⭐</span>
                      <span className="feature-text">Rate and review your reads</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🔍</span>
                      <span className="feature-text">Search and filter your collection</span>
                    </div>
                  </div>
                </div>

                {/* Login section */}
                <div className="login-section">
                  <Login onLoginSuccess={handleLoginSuccess} />
                </div>
              </>
            ) : (
              <>
                {/* Authenticated welcome */}
                <div className="authenticated-welcome">
                  <div className="welcome-icon">🎉</div>
                  <h2 className="welcome-title">Welcome Back!</h2>
                  <p className="welcome-text">
                    You're now logged in to your Pixel Book Library. Ready to manage your
                    collection?
                  </p>
                  <Button 
                    className="pixel-button library-button"
                    onClick={handleGoToLibrary}
                  >
                    ♦ GO TO LIBRARY ♦
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Footer decoration */}
          <div className="content-footer">
            <div className="footer-decoration">
              <div className="decoration-line"></div>
              <span className="decoration-text">◊ ◊ ◊</span>
              <div className="decoration-line"></div>
            </div>
          </div>
        </div>

        {/* Stats footer */}
        <div className="home-footer">
          <p className="footer-text">▲ PIXEL BOOK LIBRARY - YOUR DIGITAL READING COMPANION ▲</p>
        </div>
      </div>
    </div>
  );
}

export default Home; 