import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";  
import './ForgotPassword.css'; 

function ForgotPassword() {
    const navigate = useNavigate();
    const [message, setMessage] = useState(""); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailVal = e.target.email.value;  

        try {
            await sendPasswordResetEmail(auth, emailVal);  
            setMessage("Check your email for password reset instructions."); 
            navigate("Login");
        } catch (err) {
            setMessage("Error: " + err.message); 
        }
    };

    return (
        <div className="reset-div">
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Enter your email" required />
                <button type="submit">Reset</button>
            </form>
            {message && <p className="message">{message}</p>} 
        </div>
    );
}

export default ForgotPassword;