import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import NavbarComponent from './components/Navbar'
import Addbookcomponent from './components/Addbook'
import BookList from './components/BookList'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import axios from 'axios'

function App() {
  const [books, setBooks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on app load
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleBookAdd = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/books', {
        ...formData,
        image_url: formData.image_url || ""
      });
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Make login the default route */}
        <Route path="/" element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login onLoginSuccess={() => setIsAuthenticated(true)} />
          )
        } />
        
        {/* Protected dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <NavbarComponent onLogout={() => setIsAuthenticated(false)} />
                <Addbookcomponent onBookAdded={handleBookAdd} />
                <BookList books={books} onBooksChange={fetchBooks} />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
