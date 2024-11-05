// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { auth } from '../config/firebaseConfig';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import './signup.css';

// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [userType, setUserType] = useState('user'); // Default to user
//   const [errorMessage, setErrorMessage] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [confirmPasswordError, setConfirmPasswordError] = useState('');
//   const navigate = useNavigate();

//   const validatePassword = (password) => {
//     const minLength = 6; // Minimum length requirement
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasNumbers = /\d/.test(password);
//     const hasSpecialChars = /[!@#$%^&*]/.test(password);

//     if (password.length < minLength) {
//       return 'Password must be at least 6 characters long.';
//     }
//     if (!hasUpperCase) {
//       return 'Password must contain at least one uppercase letter.';
//     }
//     if (!hasLowerCase) {
//       return 'Password must contain at least one lowercase letter.';
//     }
//     if (!hasNumbers) {
//       return 'Password must contain at least one number.';
//     }
//     if (!hasSpecialChars) {
//       return 'Password must contain at least one special character.';
//     }
//     return '';
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');
//     setPasswordError('');
//     setConfirmPasswordError('');

//     // Validate the password
//     const validationError = validatePassword(password);
//     if (validationError) {
//       setPasswordError(validationError);
//       return;
//     }

//     // Validate confirm password
//     if (password !== confirmPassword) {
//       setConfirmPasswordError('Passwords do not match.');
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       // After successful sign-up, you can save the user role in Firestore
//       // Example: saveUserRole(userCredential.user.uid, userType);
//       navigate('/LandingPage');
//     } catch (error) {
//       setErrorMessage('Error creating account. Please try again.');
//     }

//     console.log('Sign Up:', { email, password, userType });
//   };

//   return (
//     <div className="signup-container">
//       <h1 className="signup-title">Sign Up</h1>
//       <form onSubmit={handleSignUp} className="signup-form">
//         <div className="form-group">
//           <label className="form-label">Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="form-input"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label">Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="form-input"
//             required
//           />
//           {passwordError && (
//             <p className="error-text">{passwordError}</p>
//           )}
//         </div>
//         <div className="form-group">
//           <label className="form-label">Confirm Password:</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="form-input"
//             required
//           />
//           {confirmPasswordError && (
//             <p className="error-text">{confirmPasswordError}</p>
//           )}
//         </div>
//         <div className="form-group">
//           <label className="form-label">User Type:</label>
//           <select value={userType} onChange={(e) => setUserType(e.target.value)} className="form-select">
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
//         <button type="submit" className="signup-button">Sign Up</button>
//         <Link to="/login" className='link-classname'>Already have an account? Log In</Link>

//         {errorMessage && ( 
//           <p className="error-text">{errorMessage}</p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default SignUp;







// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import './signup.css';

// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [userType, setUserType] = useState('user'); // Default to user
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');

//     if (password !== confirmPassword) {
//       setErrorMessage('Passwords do not match.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3001/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password, userType }),
//       });

//       if (!response.ok) {
//         throw new Error('Error registering user');
//       }

//       const data = await response.json();
//       console.log(data);
//       navigate('/LandingPage'); // Redirect to the landing page after successful signup
//     } catch (error) {
//       setErrorMessage(error.message);
//       console.error('Signup error:', error);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h1 className="signup-title">Sign Up</h1>
//       <form onSubmit={handleSignUp} className="signup-form">
//         <div className="form-group">
//           <label className="form-label">Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="form-input"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label">Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="form-input"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label">Confirm Password:</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="form-input"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label">User Type:</label>
//           <select value={userType} onChange={(e) => setUserType(e.target.value)} className="form-select">
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
//         <button type="submit" className="signup-button">Sign Up</button>
//         <Link to="/login" className='link-classname'>Already have an account? Log In</Link>

//         {errorMessage && ( 
//           <p className="error-text">{errorMessage}</p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default SignUp;






// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import './signup.css';

// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [userType, setUserType] = useState('user'); // Default to user
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');

//     if (password !== confirmPassword) {
//       setErrorMessage('Passwords do not match.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3001/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password, userType }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         try {
//           const errorJson = JSON.parse(errorText);
//           throw new Error(errorJson.message);
//         } catch (e) {
//           throw new Error(errorText);
//         }
//       }

//       const data = await response.json();
//       console.log(data);
//       navigate('/LandingPage'); // Redirect to the landing page after successful signup
//     } catch (error) {
//       setErrorMessage(error.message);
//       console.error('Signup error:', error);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h1 className="signup-title">Sign Up</h1>
//       <form onSubmit={handleSignUp} className="signup-form">
//         <div className="form-group">
//           <label className="form-label">Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="form-input"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label">Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="form-input"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label">Confirm Password:</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="form-input"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label">User Type:</label>
//           <select value={userType} onChange={(e) => setUserType(e.target.value)} className="form-select">
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
//         <button type="submit" className="signup-button">Sign Up</button>
//         <Link to="/login" className='link-classname'>Already have an account? Log In</Link>

//         {errorMessage && (
//           <p className="error-text">{errorMessage}</p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default SignUp;



import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './signup.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('user'); // Default to user
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long.';
    }
    if (!hasNumber.test(password)) {
      return 'Password must contain at least one number.';
    }
    if (!hasUppercase.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!hasLowercase.test(password)) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!hasSpecialChar.test(password)) {
      return 'Password must contain at least one special character.';
    }
    return '';
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, userType }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.message);
        } catch (e) {
          throw new Error(errorText);
        }
      }

      const data = await response.json();
      console.log(data);
      navigate('/'); 
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form onSubmit={handleSignUp} className="signup-form">
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">User Type:</label>
          <select value={userType} onChange={(e) => setUserType(e.target.value)} className="form-select">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
        <Link to="/login" className='link-classname'>Already have an account? Log In</Link>

        {errorMessage && (
          <p className="error-text">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default SignUp;
