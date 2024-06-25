// src/components/BookDetail.js

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./BookDetail.css"; // Import the CSS file for styling

const BookDetail = ({ addToCart }) => {
  const { id } = useParams(); // Get the book ID from the URL parameters
  const [book, setBook] = useState(null); // Initialize book state to null

  // Fetch book details from the OpenLibrary API
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org${id}.json`);
        setBook(response.data); // Set the book state with the fetched data
      } catch (error) {
        console.error("Error fetching book details:", error); // Log any errors
      }
    };

    fetchBookDetails(); // Call the fetch function
  }, [id]); // Re-run the effect if the book ID changes

  // Show a loading message while the book data is being fetched
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
