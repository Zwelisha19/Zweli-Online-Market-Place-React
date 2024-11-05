

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage'; 
import UserLogin from './Pages/UserLogin'; 
import Products from './Pages/Products';
import Signup from './Pages/Signup'; 
import AdminProductManager from './Pages/AdminProductManager'; 
import AdminLogin from './Pages/AdminLogin'; 
import './App.css'; 

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<UserLogin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/admin-login" element={<AdminLogin />} /> 
                    <Route path="/admin-product-manager" element={<AdminProductManager />} /> 
                    <Route path="/products" element={<Products />} /> 
                </Routes>
            </div>
        </BrowserRouter>       
    );
}

export default App;
