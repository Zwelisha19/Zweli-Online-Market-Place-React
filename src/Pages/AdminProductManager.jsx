

import React, { useState, useEffect } from 'react';
import './AdminProducManager.css'; 

const AdminProductManager = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: null, 
    name: '',
    description: '',
    price: '', 
    available: true,
    isHidden: false,
    image: null,
  });
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError('Error fetching products: ' + error.message);
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, name, description, price, available, isHidden, image } = formData;
    const formDataToSubmit = new FormData();

    formDataToSubmit.append('name', name);
    formDataToSubmit.append('description', description);
    formDataToSubmit.append('price', price);
    formDataToSubmit.append('available', available);
    formDataToSubmit.append('isHidden', isHidden);
    if (image) {
      formDataToSubmit.append('image', image);
    }

    try {
      if (id) {
        const response = await fetch(`http://localhost:3001/api/products/${id}`, {
          method: 'PUT',
          body: formDataToSubmit,
        });
        if (!response.ok) {
          throw new Error('Error updating product');
        }
      } else {
        const response = await fetch('http://localhost:3001/api/products', {
          method: 'POST',
          body: formDataToSubmit,
        });
        if (!response.ok) {
          throw new Error('Error creating product');
        }
      }
      fetchProducts(); 
      resetForm();
      setError(''); 
    } catch (error) {
      setError('Error saving product: ' + error.message);
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting product');
      }
      fetchProducts(); 
      setError(''); 
    } catch (error) {
      setError('Error deleting product: ' + error.message);
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      available: product.available,
      isHidden: product.isHidden,
      image: null, 
    });
    setError('');
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      description: '',
      price: '',
      available: true,
      isHidden: false,
      image: null,
    });
    setError('');
  };

  return (
    <div className="admin-product-manager">
      <h1 className="title">Manage Products</h1>
      {error && <p className="error-message">{error}</p>} 
      <form className="product-form" onSubmit={handleSubmit}>
        <input className="form-input" type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
        <textarea className="form-textarea" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input className="form-input" type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input className="form-input" type="file" name="image" onChange={handleChange} />
        <button className="submit-button" type="submit">{formData.id ? 'Update Product' : 'Add Product'}</button>
      </form>
      
      <h2 className="product-list-title">Product List</h2>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className="product-item">
            {product.name} - R{product.price} 
            <button className="edit-button" onClick={() => handleEdit(product)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductManager;
