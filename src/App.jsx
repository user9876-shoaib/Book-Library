import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavbarComponent from './components/Navbar'
import Addbookcomponent from './components/Addbook'
import BookList from './components/BookList'
import HomePage from './components/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

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

  const handleBookAdd = async () => {
    try {
      await fetchBooks(); // Refresh the book list after adding
    } catch (error) {
      console.error('Error refreshing books:', error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<HomePage />} />
        
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
