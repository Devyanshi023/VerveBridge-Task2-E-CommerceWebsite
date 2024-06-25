// src/components/Favorites.js

import React from "react";
import "./Favorites.css"; // Import the CSS file for styling

const Favorites = ({ favoriteItems = [] }) => {
  console.log("Favorite Items:", favoriteItems); // Log favorite items for debugging

  // Show message if no favorite books are added
  if (!favoriteItems || favoriteItems.length === 0) {
    return <div>No favorite books added yet.</div>;
  }

  return (
    <div className="favorites-container">
      <h1>Your Favorites</h1>
      <div className="favorites-list">
        {favoriteItems.map((book) => (
          <div key={book.key} className="favorite-item">
            <img
              src={`http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
              alt={book.title}
            />
            <h2>{book.title}</h2>
            <p>{book.author_name?.join(", ")}</p>
            <p>Price: $29.99</p> {/* Static price for example purposes */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
