from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
CORS(app, origins="http://localhost:*")

# Configure database (SQLite here, you can change)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Book(db.Model):
    sno = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    authorname = db.Column(db.String(200), nullable=False)
    genre = db.Column(db.String(200), nullable=False)
    ratings = db.Column(db.Float, nullable=False)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# API Route for adding book
@app.route("/books", methods=['POST'])
def add_book():
    data = request.get_json()
    title = data.get('title')
    authorname = data.get('authorname')
    genre = data.get('genre')
    ratings = data.get('ratings')

    book = Book(
        title=title,
        authorname=authorname,
        genre=genre,
        ratings=ratings
    )
    db.session.add(book)
    db.session.commit()

    return jsonify({'message': 'Book added successfully'}), 201

# API Route to get all books
@app.route("/books", methods=['GET'])
def get_books():
    books = Book.query.all()
    result = [{
        'sno': b.sno,
        'title': b.title,
        'authorname': b.authorname,
        'genre': b.genre,
        'ratings': b.ratings
    } for b in books]

    return jsonify(result)

@app.route("/books/<int:sno>", methods=['DELETE'])
def delete_book(sno):
    book = Book.query.get_or_404(sno)
    db.session.delete(book)
    db.session.commit()
    return jsonify({'message': 'Book deleted successfully'}), 200

@app.route("/books/<int:sno>", methods=['PUT'])
def update_book(sno):
    book = Book.query.get_or_404(sno)
    data = request.get_json()
    
    book.title = data.get('title', book.title)
    book.authorname = data.get('authorname', book.authorname)
    book.genre = data.get('genre', book.genre)
    book.ratings = data.get('ratings', book.ratings)
    
    db.session.commit()
    return jsonify({'message': 'Book updated successfully'}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Creates book.db and Book table if not already existing
    app.run(debug=True, port=5000)
