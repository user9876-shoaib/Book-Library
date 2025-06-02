import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import './UpdateBook.css';

function UpdateBook({ book, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: '',
    authorname: '',
    genre: '',
    ratings: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        authorname: book.authorname,
        genre: book.genre,
        ratings: book.ratings
      });
    }
  }, [book]);

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
      const response = await fetch(`http://localhost:5000/books/${book.sno}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setMessage({ text: 'Book updated successfully!', type: 'success' });
        // Call the callback to refresh the book list
        if (onUpdate) {
          await onUpdate();
        }
        // Close the modal after a short delay
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        throw new Error('Failed to update book');
      }
    } catch (error) {
      setMessage({ 
        text: 'Error updating book. Please try again.', 
        type: 'error' 
      });
      console.error('Error:', error);
    }
  };

  const dismissMessage = () => {
    setMessage({ text: '', type: '' });
  };

  return (
    <div className="update-book-overlay">
      <div className="update-book-container">
        {/* Title */}
        <div className="update-book-title">
          <h1 className="title-main">◆ UPDATE BOOK ◆</h1>
          <p className="title-sub">░▒▓ MODIFY BOOK DETAILS ▓▒░</p>
        </div>

        {/* Update form box */}
        <div className="update-book-form-container">
          {/* Decorative corner pixels */}
          <div className="corner-pixel corner-top-left"></div>
          <div className="corner-pixel corner-top-right"></div>
          <div className="corner-pixel corner-bottom-left"></div>
          <div className="corner-pixel corner-bottom-right"></div>

          {/* Inner decorative border */}
          <div className="inner-border"></div>

          <form onSubmit={handleSubmit} className="update-book-form">
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

            {/* Buttons */}
            <div className="button-group">
              <Button type="submit" className="pixel-button update-button">
                ♦ UPDATE BOOK ♦
              </Button>
              <Button 
                type="button" 
                className="pixel-button cancel-button"
                onClick={onClose}
              >
                ♦ CANCEL ♦
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="form-decoration">
              <div className="decoration-line"></div>
              <span className="decoration-text">◊ ◊ ◊</span>
              <div className="decoration-line"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBook; 