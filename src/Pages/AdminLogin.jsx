// import React, { useState } from 'react';
// import { auth } from '../config/firebaseConfig';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async () => {
//         try {
//             console.log('Attempting login with:', { email, password });
//             await signInWithEmailAndPassword(auth, email, password);
//             onLogin(); 
//             navigate('/AdminDashboard'); 
//         } catch (error) {
//             console.error("Login error:", error);
//             setErrorMessage('Error logging in: ' + error.message);
//         }
//     };

//     return (
//         <div>
//             <h2>Admin Login</h2>
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password} 
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//             />
//             <button onClick={handleLogin}>Login</button>
//             {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//         </div>
//     );
// };

// export default AdminLogin;


import React, { useState } from 'react';
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            console.log('Attempting login with:', { email, password });
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/AdminDashboard'); // Navigate directly after successful login
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage('Error logging in: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button onClick={handleLogin}>Login</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default AdminLogin;
