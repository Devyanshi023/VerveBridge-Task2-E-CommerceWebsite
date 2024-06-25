import React from "react";
import { useLocation } from "react-router-dom";
import useFetchBooks from "../hooks/useFetchBooks";
import "./Search.css";

const Search = ({ addToCart, addToFavorites }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const { books, loading, error } = useFetchBooks(query);

  return (
    <div className="search-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="book-list">
          <h3>{query.toUpperCase()}</h3>
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
