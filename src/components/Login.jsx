import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button'
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import './Login.css';

function Login({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Dummy credentials
  const validCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === validCredentials.username && 
        credentials.password === validCredentials.password) {
      // Store authentication state
      localStorage.setItem('isAuthenticated', 'true');
      // Call the success callback
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Try username: admin, password: admin123');
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      {/* Floating decorative elements */}
      <div className="float-decoration float-1"></div>
      <div className="float-decoration float-2"></div>
      <div className="float-decoration float-3"></div>

      {/* Main login container */}
      <div className="login-wrapper">
        {/* Title */}
        <div className="login-title">
          <h1 className="title-main">◆ LOGIN ◆</h1>
          <p className="title-sub">░▒▓ ENTER THE ZONE ▓▒░</p>
        </div>

        {/* Login form box */}
        <div className="login-form-container">
          {/* Decorative corner pixels */}
          <div className="corner-pixel corner-top-left"></div>
          <div className="corner-pixel corner-top-right"></div>
          <div className="corner-pixel corner-bottom-left"></div>
          <div className="corner-pixel corner-bottom-right"></div>

          {/* Inner decorative border */}
          <div className="inner-border"></div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <Alert className="error-alert">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Username field */}
            <div className="form-group">
              <Label htmlFor="username" className="pixel-label">
                ▓ USERNAME
              </Label>
              <Input
                id="username"
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="pixel-input"
                placeholder="ENTER_USERNAME"
                required
              />
            </div>

            {/* Password field */}
            <div className="form-group">
              <Label htmlFor="password" className="pixel-label">
                ▓ PASSWORD
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="pixel-input"
                placeholder="ENTER_PASSWORD"
                required
              />
            </div>

            {/* Login button */}
            <Button type="submit" className="pixel-button">
              ♦ LOG IN ♦
            </Button>

            {/* Decorative elements */}
            <div className="form-decoration">
              <div className="decoration-line"></div>
              <span className="decoration-text">◊ ◊ ◊</span>
              <div className="decoration-line"></div>
            </div>
          </form>
        </div>

        {/* Footer text */}
        <div className="login-footer">
          <p className="footer-text">▲ RETRO AUTHENTICATION SYSTEM ▲</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
