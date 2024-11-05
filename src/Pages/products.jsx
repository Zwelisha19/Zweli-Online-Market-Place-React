import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useCart } from '../context/CartContext'; 
import './products.css'; 

const Products = () => {
    const { cart, addToCart } = useCart(); 
    const navigate = useNavigate(); 
    const [products, setProducts] = React.useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
              const response = await fetch('http://localhost:3001/api/products');
                
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

 
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="products-container">
            <h1 className="products-title">Products</h1>
            <div className="products-list">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-price">R{product.price}</p>
                        <button className="add-to-cart-button" onClick={() => addToCart(product)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <h2>Cart Summary</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <ul>
                            {cart.map(item => (
                                <li key={item.id}>
                                    {item.name} - R{item.price} x {item.quantity}
                                </li>
                            ))}
                        </ul>
                        <p><strong>Total Price: R{totalPrice.toFixed(2)}</strong></p>
                        <button onClick={() => navigate('/cart')} className="go-to-cart-button">
                            Go to Cart
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Products;
