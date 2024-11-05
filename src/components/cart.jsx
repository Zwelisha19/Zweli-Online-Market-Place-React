import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; 
import './cart.css'

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate(); 
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                {item.name} - R{item.price} x 
                                <input 
                                    type="number" 
                                    value={item.quantity} 
                                    min="1" 
                                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))} 
                                />
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <p><strong>Total Price: R{totalPrice.toFixed(2)}</strong></p>
                    <button onClick={() => navigate('/checkout')} className="checkout-button">
                        Proceed to Checkout
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;
