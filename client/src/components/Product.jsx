// src/components/Product.js
import React from "react";

const Product = ({ product, addToCart }) => {
  return (
    <div className="item">
      <img src={product.image} alt={product.name} />
      <div className="title">{product.name}</div>
      <div className="price">{product.price.toLocaleString()}</div>
      <button onClick={() => addToCart(product)}>Add To Cart</button>
    </div>
  );
};

export default Product;
