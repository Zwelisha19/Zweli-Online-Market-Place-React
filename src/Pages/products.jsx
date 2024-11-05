// src/Pages/Products.jsx
import React, { useState } from 'react';
import './products.css';

const Products = () => {
  const [cart, setCart] = useState([]);
  
  const products = [
    { id: 1, name: 'Product 1', price: 29.99, image: 'path/to/image1.jpg' },
    { id: 2, name: 'Product 2', price: 39.99, image: 'path/to/image2.jpg' },
    { id: 3, name: 'Product 3', price: 19.99, image: 'path/to/image3.jpg' },
    { id: 4, name: 'Product 4', price: 49.99, image: 'path/to/image4.jpg' },
  ];

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="products-container">
      <h1 className="products-title">Available Products</h1>
      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)} className="add-to-cart-button">Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Products;
