// src/components/Checkout.js
import React, { useState } from "react";
import "./Checkout.css";

const Checkout = ({ cartItems }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const totalAmount = cartItems
    .reduce((acc, book) => acc + 29.99 * book.quantity, 0)
    .toFixed(2);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    // Here you can add additional logic for order processing
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {orderPlaced ? (
        <div className="order-confirmation">
          <h2>Thank you for your order!</h2>
          <p>Your order has been placed successfully.</p>
        </div>
      ) : (
        <div>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map((book) => (
                <div key={book.key} className="checkout-item">
                  <img
                    src={`http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                    alt={book.title}
                  />
                  <div className="checkout-item-details">
                    <h2>{book.title}</h2>
                    <p>{book.author_name?.join(", ")}</p>
                    <p>Price: $29.99</p>
                    <p>Quantity: {book.quantity}</p>
                  </div>
                </div>
              ))}
              <div className="checkout-summary">
                <h2>Total: ${totalAmount}</h2>
                <button onClick={handlePlaceOrder}>Place Order</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkout;
