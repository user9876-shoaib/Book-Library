import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';

function BookList({ books, onBooksChange }) {
  const [editingBook, setEditingBook] = useState(null);

  const handleDelete = async (sno) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:5000/books/${sno}`);
        onBooksChange(); // Refresh the list
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const handleUpdate = async (book) => {
    setEditingBook(book);
  };

  return (
    <Container fluid className="mt-5 px-4">
      <h2 className="mb-4">Book List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{ width: '5%' }}>#</th>
            <th style={{ width: '25%' }}>Title</th>
            <th style={{ width: '25%' }}>Author</th>
            <th style={{ width: '20%' }}>Genre</th>
            <th style={{ width: '10%' }}>Rating</th>
            <th style={{ width: '15%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.sno}>
              <td>{book.sno}</td>
              <td>{book.title}</td>
              <td>{book.authorname}</td>
              <td>{book.genre}</td>
              <td>{book.ratings}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => handleUpdate(book)}
                  >
                    Update
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleDelete(book.sno)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default BookList;