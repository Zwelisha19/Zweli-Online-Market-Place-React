

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 

const Checkout = () => {
    const { cart, clearCart, userId } = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const navigate = useNavigate(); 
    const handleOrderSuccess = async (details) => {
        const orderData = {
            userId: userId, 
            items: cart,
            total: totalPrice,
            paymentDetails: details,
        };
    
        try {
            const response = await fetch('http://localhost:3001/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
    
            if (response.ok) {
                setPaymentSuccess(true);
                clearCart();
                alert('Thank you for your order!'); 
                navigate('/confirmation', { state: { orderData } }); 
            } else {
                console.error('Failed to create order:', response.statusText);
                alert('Failed to save order. Please try again.');
            }
        } catch (error) {
            console.error('Error sending order data to server:', error);
            alert('Error saving order. Please try again.');
        }
    };
    
    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty. Please add items to your cart before proceeding to checkout.</p>
            ) : (
                <>
                    <h3>Order Summary</h3>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                {item.name} - R{item.price} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <p><strong>Total Price: R{totalPrice.toFixed(2)}</strong></p>

                    <h3>Payment</h3>
                    <PayPalScriptProvider options={{ "client-id": "AfAOPT-rgkwFZjOSY8CVmjSspVGOf4SUgY1UC5oxhZuK8b7CuAVHOwMPo-14ka-_FOwjZ9qQw2MXlV5A" }}>
                        <PayPalButtons
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [{
                                        amount: {
                                            value: totalPrice.toString(),
                                        },
                                    }],
                                });
                            }}
                            onApprove={async (data, actions) => {
                                try {
                                    const details = await actions.order.capture();
                                    await handleOrderSuccess(details);
                                } catch (error) {
                                    console.error('Payment failed:', error);
                                }
                            }}
                            onError={(error) => {
                                console.error('Payment error:', error);
                                alert('Payment error. Please try again.');
                            }}
                        />
                    </PayPalScriptProvider>
                </>
            )}
        </div>
    );
};

export default Checkout;
