// src/components/Categories.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Categories.css";

const Categories = ({ addToCart, addToFavorites }) => {
  const [genres, setGenres] = useState([
    "Fiction",
    "Fantasy",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Horror",
    "Biography",
    "History",
    "Children",
    "Non-Fiction",
  ]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedGenre) {
      setLoading(true);
      axios
        .get(
          `https://openlibrary.org/subjects/${selectedGenre
            .toLowerCase()
            .replace(" ", "_")}.json`
        )
        .then((response) => {
          setBooks(response.data.works);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
          setLoading(false);
        });
    }
  }, [selectedGenre]);

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div className="categories-container">
      <h1>Categories</h1>
      <div className="genre-list">
        {genres.map((genre, index) => (
          <button key={index} onClick={() => handleGenreChange(genre)}>
            {genre}
          </button>
        ))}
      </div>
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <div key={book.key} className="book-item">
              <img
                src={`http://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
                alt={book.title}
              />
              <h2>{book.title}</h2>
              <p>{book.authors?.map((author) => author.name).join(", ")}</p>
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

export default Categories;
