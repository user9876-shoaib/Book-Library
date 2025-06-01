import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function NavbarComponent({ onLogout }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    onLogout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleGenreDropdown = () => {
    setIsGenreDropdownOpen(!isGenreDropdownOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Add your search functionality here
    console.log('Searching for:', searchValue);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <nav className="pixel-navbar">
      {/* Decorative corner pixels */}
      <div className="navbar-corner-pixel corner-top-left"></div>
      <div className="navbar-corner-pixel corner-top-right"></div>

      <div className="navbar-container">
        {/* Brand */}
        <div className="navbar-brand">
          <span className="brand-text">◆ BOOK-LIBRARY ◆</span>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="toggle-line"></span>
          <span className="toggle-line"></span>
          <span className="toggle-line"></span>
        </button>

        {/* Navigation menu */}
        <div className={`navbar-menu ${isMenuOpen ? 'menu-open' : ''}`}>
          {/* Nav links */}
          <div className="nav-links">
            <a href="#home" className="nav-link">
              ▓ HOME
            </a>
            
            {/* Genre dropdown */}
            <div className="nav-dropdown">
              <button 
                className="nav-dropdown-toggle"
                onClick={toggleGenreDropdown}
              >
                ▓ GENRE ▼
              </button>
              {isGenreDropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-corner-pixel dropdown-corner-tl"></div>
                  <div className="dropdown-corner-pixel dropdown-corner-tr"></div>
                  <div className="dropdown-corner-pixel dropdown-corner-bl"></div>
                  <div className="dropdown-corner-pixel dropdown-corner-br"></div>
                  <a href="#action/3.1" className="dropdown-item">⚔ ACTION</a>
                  <a href="#action/3.1" className="dropdown-item">🐉 FANTASY</a>
                  <a href="#action/3.1" className="dropdown-item">📚 FICTION</a>
                  <a href="#action/3.1" className="dropdown-item">💕 ROMANCE</a>
                  <a href="#action/3.1" className="dropdown-item">🎈 KIDS</a>
                  <a href="#action/3.1" className="dropdown-item">🔍 SUSPENSE</a>
                </div>
              )}
            </div>
          </div>

          {/* Search form */}
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="SEARCH_BOOKS"
              className="search-input"
              value={searchValue}
              onChange={handleSearchChange}
              aria-label="Search"
            />
            <button type="submit" className="search-button">
              🔍
            </button>
          </form>

          {/* Logout button */}
          <button 
            className="logout-button"
            onClick={handleLogout}
          >
            ♦ LOGOUT ♦
          </button>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="navbar-bottom-decoration">
        <div className="decoration-pixel"></div>
        <div className="decoration-pixel"></div>
        <div className="decoration-pixel"></div>
        <div className="decoration-pixel"></div>
        <div className="decoration-pixel"></div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
