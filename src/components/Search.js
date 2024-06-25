// src/components/Search.js

import React from "react";
import { useLocation } from "react-router-dom";
import useFetchBooks from "../hooks/useFetchBooks";
import "./Search.css"; // Import the CSS file for styling

const Search = ({ addToCart, addToFavorites }) => {
  const location = useLocation(); // Get the current location object
  const query = new URLSearchParams(location.search).get("q") || ""; // Extract the search query from the URL
  const { books, loading, error } = useFetchBooks(query); // Custom hook to fetch books based on the query

  return (
    <div className="search-container">
      {loading ? (
        <p>Loading...</p> // Display loading message while fetching data
      ) : error ? (
        <p>{error}</p> // Display error message if there is an error
      ) : (
        <div className="book-list">
          <h3>{query.toUpperCase()}</h3> {/* Display the search query as a heading */}
          {books.map((book) => (
            <div key={book.key} className="book-item">
              <img
                src={`http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                alt={book.title}
              />
              <h2>{book.title}</h2>
              <p>{book.author_name?.join(", ")}</p>
              <p>Price: $29.99</p> {/* Static price for example purposes */}
              <button onClick={() => addToCart(book)}>Add to Cart</button>
              <button onClick={() => addToFavorites(book)}>
                Add to Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
