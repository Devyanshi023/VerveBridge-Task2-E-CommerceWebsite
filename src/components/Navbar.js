// src/components/Navbar.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for styling
import logo from "../assets/logo.jpg"; // Import the logo image

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for managing the search query
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for managing the menu toggle
  const navigate = useNavigate(); // Hook for navigation

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`); // Navigate to the search results page with the query
  };

  // Toggle the menu open/close state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <Link to="/">
          <h1>BookStore</h1>
        </Link>
      </div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="nav-links-container">
        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/categories" onClick={toggleMenu}>
            Categories
          </Link>
          <Link to="/favorites" onClick={toggleMenu}>
            Favorites
          </Link>
          <Link to="/cart" onClick={toggleMenu}>
            Cart
          </Link>
        </div>
        <button className="navbar-toggler" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
