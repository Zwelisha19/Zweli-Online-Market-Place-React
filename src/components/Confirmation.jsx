

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Confirmation.css'


const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderData } = location.state || {}; 

    if (!orderData) {
        return <h2>No order details available</h2>; 
    }

    return (
        <div className="confirmation-container">
            <h2>Order Confirmation</h2>
            <p>Thank you for your order!</p>
            <h3>Order Summary</h3>
            <ul>
                {orderData.items.map(item => (
                    <li key={item.id}>
                        {item.name} - R{item.price} x {item.quantity}
                    </li>
                ))}
            </ul>
            <p><strong>Total Price: R{orderData.total.toFixed(2)}</strong></p>
            <p>Your order will be processed shortly.</p>
            <button onClick={() => navigate('/products')} className="navigate-button">
                View Products
            </button>
        </div>
    );
};

export default Confirmation;
