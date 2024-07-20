// src/pages/CartPage.js
import React, { useState } from "react";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import "../components/CartPage.css";

const CartPage = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
    setQuantity(
      cartItems.reduce(
        (acc, item) => acc + (item.id === id ? quantity : item.quantity),
        0
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  return (
    <div className={`container ${cartOpen ? "active" : ""}`}>
      <Header quantity={quantity} toggleCart={toggleCart} />
      <ProductList addToCart={addToCart} />
      {cartOpen && (
        <Cart
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          toggleCart={toggleCart}
        />
      )}
    </div>
  );
};

export default CartPage;
