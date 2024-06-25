import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Booklist";
import BookDetail from "./components/BookDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Favorites from "./components/Favorites";
import SearchResults from "./components/Search";
import Categories from "./components/Categories";
import "./App.css";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const addToCart = (book) => {
    const existingBook = cartItems.find((item) => item.key === book.key);
    if (existingBook) {
      setCartItems(
        cartItems.map((item) =>
          item.key === book.key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...book, quantity: 1 }]);
    }
  };

  const removeFromCart = (book) => {
    setCartItems(cartItems.filter((item) => item.key !== book.key));
  };

  const updateQuantity = (book, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.key === book.key ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const addToFavorites = (book) => {
    setFavoriteItems((prevFavorites) => {
      if (prevFavorites.some((item) => item.key === book.key)) {
        return prevFavorites;
      }
      return [...prevFavorites, book];
    });
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home addToCart={addToCart} addToFavorites={addToFavorites} />
            }
          />
          <Route
            path="/book/:id"
            element={<BookDetail addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            }
          />
          <Route
            path="/checkout"
            element={<Checkout cartItems={cartItems} />}
          />
          <Route
            path="/favorites"
            element={<Favorites favoriteItems={favoriteItems} />}
          />
          <Route
            path="/search"
            element={
              <SearchResults
                addToCart={addToCart}
                addToFavorites={addToFavorites}
              />
            }
          />
          <Route
            path="/categories"
            element={
              <Categories
                addToCart={addToCart}
                addToFavorites={addToFavorites}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
