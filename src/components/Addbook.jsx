import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import './Addbook.css';

function AddBook({ onBookAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    authorname: '',
    genre: '',
    ratings: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call - replace with your actual API endpoint
      const response = await fetch('http://localhost:5000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setMessage({ text: 'Book added successfully!', type: 'success' });
        setFormData({
          title: '',
          authorname: '',
          genre: '',
          ratings: ''
        });
        // Call the callback to refresh the book list
        if (onBookAdded) {
          onBookAdded();
        }
      } else {
        throw new Error('Failed to add book');
      }
    } catch (error) {
      setMessage({ 
        text: 'Error adding book. Please try again.', 
        type: 'error' 
      });
      console.error('Error:', error);
    }
  };

  const dismissMessage = () => {
    setMessage({ text: '', type: '' });
  };

  return (
    <div className="addbook-container">
      {/* Floating decorative elements */}
      <div className="float-decoration float-1"></div>
      <div className="float-decoration float-2"></div>
      <div className="float-decoration float-3"></div>
      <div className="float-decoration float-4"></div>

      {/* Main addbook container */}
      <div className="addbook-wrapper">
        {/* Title */}
        <div className="addbook-title">
          <h1 className="title-main">◆ ADD BOOK ◆</h1>
          <p className="title-sub">░▒▓ EXPAND THE LIBRARY ▓▒░</p>
        </div>

        {/* AddBook form box */}
        <div className="addbook-form-container">
          {/* Decorative corner pixels */}
          <div className="corner-pixel corner-top-left"></div>
          <div className="corner-pixel corner-top-right"></div>
          <div className="corner-pixel corner-bottom-left"></div>
          <div className="corner-pixel corner-bottom-right"></div>

          {/* Inner decorative border */}
          <div className="inner-border"></div>

          <form onSubmit={handleSubmit} className="addbook-form">
            {message.text && (
              <div className="message-container">
                <Alert className={`pixel-alert ${message.type === 'success' ? 'success-alert' : 'error-alert'}`}>
                  <AlertDescription>{message.text}</AlertDescription>
                  <button 
                    type="button" 
                    className="dismiss-button"
                    onClick={dismissMessage}
                  >
                    ✕
                  </button>
                </Alert>
              </div>
            )}

            {/* Title field */}
            <div className="form-group">
              <Label htmlFor="title" className="pixel-label">
                ▓ BOOK TITLE
              </Label>
              <Input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="pixel-input"
                placeholder="ENTER_BOOK_TITLE"
                required
              />
            </div>

            {/* Author field */}
            <div className="form-group">
              <Label htmlFor="authorname" className="pixel-label">
                ▓ AUTHOR NAME
              </Label>
              <Input
                id="authorname"
                type="text"
                name="authorname"
                value={formData.authorname}
                onChange={handleChange}
                className="pixel-input"
                placeholder="ENTER_AUTHOR_NAME"
                required
              />
            </div>

            {/* Genre field */}
            <div className="form-group">
              <Label htmlFor="genre" className="pixel-label">
                ▓ GENRE
              </Label>
              <Input
                id="genre"
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="pixel-input"
                placeholder="ENTER_GENRE"
                required
              />
            </div>

            {/* Ratings field */}
            <div className="form-group">
              <Label htmlFor="ratings" className="pixel-label">
                ▓ RATINGS (0-5)
              </Label>
              <Input
                id="ratings"
                type="number"
                name="ratings"
                value={formData.ratings}
                onChange={handleChange}
                className="pixel-input"
                placeholder="ENTER_RATING"
                min="0"
                max="5"
                step="0.1"
                required
              />
            </div>

            {/* Add Book button */}
            <Button type="submit" className="pixel-button">
              ♦ ADD BOOK ♦
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
        <div className="addbook-footer">
          <p className="footer-text">▲ RETRO BOOK MANAGEMENT SYSTEM ▲</p>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
