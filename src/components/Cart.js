// src/components/Cart.js
import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const handleQuantityChange = (book, quantity) => {
    updateQuantity(book, quantity);
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((book) => (
            <div key={book.key} className="cart-item">
              <img
                src={`http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                alt={book.title}
              />
              <div className="cart-item-details">
                <h2>{book.title}</h2>
                <p>Price: $29.99</p>
                <label>
                  Quantity:
                  <input
                    type="number"
                    value={book.quantity}
                    onChange={(e) => handleQuantityChange(book, e.target.value)}
                    min="1"
                  />
                </label>
                <button className="remove" onClick={() => removeFromCart(book)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h2>
              Subtotal: $
              {cartItems
                .reduce((acc, book) => acc + 29.99 * book.quantity, 0)
                .toFixed(2)}
            </h2>
            <Link className="check" to="/checkout">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
