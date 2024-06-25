import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookList.css";

const BookList = ({ addToCart, addToFavorites }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://openlibrary.org/search.json?q=bestsellers&limit=30"
        );
        setBooks(response.data.docs);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-list">
      <h3>Best sellers</h3>
      {books.map((book) => (
        <div key={book.key} className="book-item">
          <img
            src={`http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
            alt={book.title}
          />
          <h2>{book.title}</h2>
          <p>{book.author_name?.join(", ")}</p>
          <p>Price: $29.99</p>
          <button onClick={() => addToCart(book)}>Add to Cart</button>
          <button onClick={() => addToFavorites(book)}>Add to Favorites</button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
