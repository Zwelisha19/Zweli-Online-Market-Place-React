

import React, { useState } from 'react';
import UserLogin from './UserLogin'; 
import AdminLogin from './AdminLogin';
import './LandingPage.css'; 
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [isAdminLogin, setIsAdminLogin] = useState(false);

    const toggleLogin = () => {
        setIsAdminLogin(!isAdminLogin);
    };

    return (
        <div className="landing-page">
            <nav>
                <div className="logo-div">
                    <img src="src/assets/images/logo.PNG" alt="logo" />
                </div>
            </nav>
            <div className="hero-section">
                <h1>Welcome to Zweli Marketplace</h1>
                <p>Your one-stop shop for amazing products.</p>
                <div className="buttons">
                    <Link to="/signup">
                        <button className="landing-button">Sign Up</button>
                    </Link>
                </div>
            </div>
            <div className="login-section">
                <h2>{isAdminLogin ? 'Admin Login' : 'User Login'}</h2>
                <button onClick={toggleLogin}>
                    Switch to {isAdminLogin ? 'User' : 'Admin'} Login
                </button>
                {isAdminLogin ? (
                    <AdminLogin />
                ) : (
                    <UserLogin />
                )}
            </div>
        </div>
    );
};

export default LandingPage;
