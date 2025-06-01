import { useState } from 'react';
import { Button } from '../ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../ui/Table';
import { Alert, AlertDescription } from '../ui/alert';
import axios from 'axios';
import './BookList.css';

function BookList({ books, onBooksChange }) {
  const [editingBook, setEditingBook] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleDelete = async (sno) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:5000/books/${sno}`);
        setMessage({ text: 'Book deleted successfully!', type: 'success' });
        onBooksChange(); // Refresh the list
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      } catch (error) {
        setMessage({ text: 'Error deleting book. Please try again.', type: 'error' });
        console.error('Error deleting book:', error);
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      }
    }
  };

  const handleUpdate = async (book) => {
    setEditingBook(book);
  };

  const dismissMessage = () => {
    setMessage({ text: '', type: '' });
  };

  return (
    <div className="booklist-container">
      {/* Floating decorative elements */}
      <div className="float-decoration float-1"></div>
      <div className="float-decoration float-2"></div>
      <div className="float-decoration float-3"></div>
      <div className="float-decoration float-4"></div>

      {/* Main booklist wrapper */}
      <div className="booklist-wrapper">
        {/* Title */}
        <div className="booklist-title">
          <h1 className="title-main">◆ BOOK LIBRARY ◆</h1>
          <p className="title-sub">░▒▓ DIGITAL COLLECTION ▓▒░</p>
        </div>

        {/* Message display */}
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

        {/* Table container */}
        <div className="table-container">
          {/* Decorative corner pixels */}
          <div className="corner-pixel corner-top-left"></div>
          <div className="corner-pixel corner-top-right"></div>
          <div className="corner-pixel corner-bottom-left"></div>
          <div className="corner-pixel corner-bottom-right"></div>

          {/* Inner decorative border */}
          <div className="inner-border"></div>

          <div className="table-wrapper">
            <Table className="pixel-table">
              <TableHeader>
                <TableRow className="table-header-row">
                  <TableHead className="table-header-cell sno-column">▓ #</TableHead>
                  <TableHead className="table-header-cell title-column">▓ TITLE</TableHead>
                  <TableHead className="table-header-cell author-column">▓ AUTHOR</TableHead>
                  <TableHead className="table-header-cell genre-column">▓ GENRE</TableHead>
                  <TableHead className="table-header-cell rating-column">▓ RATING</TableHead>
                  <TableHead className="table-header-cell actions-column">▓ ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.sno} className="table-body-row">
                    <TableCell className="table-body-cell sno-cell">{book.sno}</TableCell>
                    <TableCell className="table-body-cell title-cell">{book.title}</TableCell>
                    <TableCell className="table-body-cell author-cell">{book.authorname}</TableCell>
                    <TableCell className="table-body-cell genre-cell">{book.genre}</TableCell>
                    <TableCell className="table-body-cell rating-cell">
                      <span className="rating-display">★ {book.ratings}</span>
                    </TableCell>
                    <TableCell className="table-body-cell actions-cell">
                      <div className="action-buttons">
                        <Button 
                          className="pixel-update-button"
                          onClick={() => handleUpdate(book)}
                        >
                          ♦ UPDATE
                        </Button>
                        <Button 
                          className="pixel-delete-button"
                          onClick={() => handleDelete(book.sno)}
                        >
                          ♦ DELETE
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {books.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📚</div>
                <p className="empty-text">NO BOOKS FOUND</p>
                <p className="empty-subtext">Add some books to see them here</p>
              </div>
            )}
          </div>

          {/* Footer decoration */}
          <div className="table-footer">
            <div className="footer-decoration">
              <div className="decoration-line"></div>
              <span className="decoration-text">◊ ◊ ◊</span>
              <div className="decoration-line"></div>
            </div>
          </div>
        </div>

        {/* Stats footer */}
        <div className="booklist-footer">
          <p className="footer-text">▲ TOTAL BOOKS: {books.length} ▲</p>
        </div>
      </div>
    </div>
  );
}

export default BookList;