// src/components/BookDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./BookDetail.css"; // Import the CSS file for styling

const BookDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org${id}.json`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-detail">
      <h1>{book.title}</h1>
      <img
        src={`http://covers.openlibrary.org/b/id/${
          book.covers ? book.covers[0] : ""
        }-L.jpg`}
        alt={book.title}
      />
      <p>Author: {book.authors.map((author) => author.name).join(", ")}</p>
      <p>Price: $29.99</p> {/* Static price for example purposes */}
      <button onClick={() => addToCart(book)}>Add to Cart</button>
      <br />
      <Link to="/">Back to Book List</Link>
    </div>
  );
};

export default BookDetail;
