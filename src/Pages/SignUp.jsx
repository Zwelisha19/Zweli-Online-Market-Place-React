import React, { useState } from 'react';
import './signup.css'; 
import { useNavigate } from 'react-router-dom';
import { auth, database } from "../config/firebaseConfig";
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dbref = collection(database, "Users");

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/; 
    const phonePattern = /^\d{10}$/;

    if (!name) newErrors.name = 'Name is required';
    if (!surname) newErrors.surname = 'Surname is required';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    else if (!phonePattern.test(phoneNumber)) newErrors.phoneNumber = 'Invalid phone number';

    if (!email) newErrors.email = 'Email is required';
    else if (!emailPattern.test(email)) newErrors.email = 'Invalid email address';

    if (!password) newErrors.password = 'Password is required';
    else if (!passwordPattern.test(password)) 
      newErrors.password = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';

    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    return newErrors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(dbref, {
        uid: user.uid,
        email: user.email,
        name,
        surname,
        phoneNumber,
        createdAt: new Date(),
      });

      alert('User registered successfully!');
      navigate("/login");
    } catch (error) {
      console.error('Error during sign up:', error.message);
      alert('Error during sign up: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form className="signup-form" onSubmit={handleSignUp}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: '' }));
            }}
            required
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Surname:</label>
          <input
            type="text"
            className="form-input"
            value={surname}
            onChange={(e) => {
              setSurname(e.target.value);
              setErrors((prev) => ({ ...prev, surname: '' }));
            }}
            required
          />
          {errors.surname && <p className="error-text">{errors.surname}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number:</label>
          <input
            type="text"
            className="form-input"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setErrors((prev) => ({ ...prev, phoneNumber: '' }));
            }}
            required
          />
          {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: '' }));
            }}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: '' }));
            }}
            required
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Confirm Password:</label>
          <input
            type="password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors((prev) => ({ ...prev, confirmPassword: '' }));
            }}
            required
          />
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="signup-button" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <Link to={"/login"} className='link-classname'>Already registered? Log In</Link>
      </form>
    </div>
  );
};

export default SignUp;