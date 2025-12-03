import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../../api/authApi';
import { AuthContext } from '../../context/AuthContext';
import './LoginPage.css'; 

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authApi.login(email, password);
            const data = response.data; 

            if (data.token) {
                login(data);
                console.log("Login Successful. Parent Role:", data.role, "Sub Role:", data.employeeRole);

                const mainRole = data.role ? String(data.role).toUpperCase() : "";
                const subRole = data.employeeRole ? String(data.employeeRole).toUpperCase() : "";

                if (mainRole === 'CUSTOMER') {
                    navigate('/customer');
                }
                else if (mainRole === 'EMPLOYEE') {
                    if (subRole === 'MANAGER') {
                        navigate('/manager');
                    } else if (subRole === 'WAITER') {
                        navigate('/orders');
                    } else {
                        navigate('/orders');
                    }
                }
                else {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed! Check your information.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                
                <form onSubmit={handleLogin} className="login-form">
                    <input
                        className="form-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        className="form-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="btn-submit">
                        Login
                    </button>

                    <p 
                        className="register-link" 
                        onClick={() => navigate('/register')}
                    >
                        Don't you have an account? <span>Register</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;