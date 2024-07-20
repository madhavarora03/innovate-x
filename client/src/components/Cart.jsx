// src/components/Cart.js
import React from "react";

const Cart = ({ cartItems, updateQuantity, removeFromCart, toggleCart }) => {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="card">
      <h1>Cart</h1>
      <ul className="listCard">
        {cartItems.map((item) => (
          <li key={item.id}>
            <div>
              <img src={item.image} alt={item.name} />
            </div>
            <div>{item.name}</div>
            <div>{item.price.toLocaleString()}</div>
            <div>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <div className="count">{item.quantity}</div>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="checkOut">
        <div className="total">{totalPrice.toLocaleString()}</div>
        <div className="closeShopping" onClick={toggleCart}>
          Close
        </div>
      </div>
    </div>
  );
};

export default Cart;
