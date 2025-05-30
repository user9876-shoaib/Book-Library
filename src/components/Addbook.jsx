import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

function Addbookcomponent({ onBookAdded }) {
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
      const response = await axios.post('http://localhost:5000/books', formData);
      setMessage({ text: 'Book added successfully!', type: 'success' });
      setFormData({
        title: '',
        authorname: '',
        genre: '',
        ratings: ''
      });
      // Call the callback to refresh the book list
      onBookAdded();
    } catch (error) {
      setMessage({ 
        text: 'Error adding book. Please try again.', 
        type: 'danger' 
      });
      console.error('Error:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col>
          <Form style={{ minWidth: '300px', margin: '50px' }} onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Add New Book</h2>
            {message.text && (
              <Alert variant={message.type} onClose={() => setMessage({ text: '', type: '' })} dismissible>
                {message.text}
              </Alert>
            )}
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter book title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="authorname">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                name="authorname"
                placeholder="Enter author name"
                value={formData.authorname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="genre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                name="genre"
                placeholder="Enter genre"
                value={formData.genre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ratings">
              <Form.Label>Ratings</Form.Label>
              <Form.Control
                type="number"
                name="ratings"
                placeholder="Enter rating (0-5)"
                value={formData.ratings}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Add Book
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Addbookcomponent;
