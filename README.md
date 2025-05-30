# Book Library

A full-stack web application for managing a book library. This project includes both frontend and backend components.

## Features

- Add new books with details (title, author, genre, ratings)
- View all books in the library
- Update book information
- Delete books
- Book cover image support

## Tech Stack

- Frontend: React.js
- Backend: Flask (Python)
- Database: SQLite
- API: RESTful

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - Unix/MacOS:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the Flask server:
   ```bash
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /books` - Get all books
- `POST /books` - Add a new book
- `PUT /books/<id>` - Update a book
- `DELETE /books/<id>` - Delete a book

## License

MIT
