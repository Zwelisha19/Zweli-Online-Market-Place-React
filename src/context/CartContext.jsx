
import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext'; 


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { currentUser } = useAuth(); 
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item =>
                item.id === product.id 
                ? { ...existingProduct, quantity: existingProduct.quantity + 1 }
                : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCart(cart.map(item =>
            item.id === id 
            ? { ...item, quantity } 
            : item
        ));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, userId: currentUser?.uid }}>
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => {
    return useContext(CartContext);
};
