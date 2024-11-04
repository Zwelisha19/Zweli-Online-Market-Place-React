
import React from 'react';
import './LandingPage.css'; 

const LandingPage = () => {
    return (
        <div className="landing-page">
                <nav>
            <div className='logo-div'>
                    <img src="src/assets/images/logo.PNG" alt="logo" />
                </div>
            </nav>
            <div className="hero-section">
                <h1>Welcome to Zweli Marketplace</h1>
                <p>Your one-stop shop for amazing products.</p>
                <div className="buttons">
                    <button className="landing-button">Login</button>
                    <button className="landing-button">Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
