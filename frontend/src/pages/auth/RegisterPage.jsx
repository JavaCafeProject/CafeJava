import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../../api/authApi'; 
import './RegisterPage.css'; 

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await authApi.register(formData);
            alert("Registration successful! Please log in.");
            navigate('/login'); // Genelde kayıttan sonra logine atarız, burayı düzelttim. İstersen /customer yapabilirsin.
        } catch (error) {
            console.error("Register Error:", error);
            alert("An error occurred while registering.");
            navigate('/');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Register</h2>
                
                <form onSubmit={handleRegister} className="register-form">
                    
                    <div className="name-row">
                        <input 
                            className="form-input"
                            name="firstName" 
                            placeholder="First Name" 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            className="form-input"
                            name="lastName" 
                            placeholder="Last Name" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <input 
                        className="form-input"
                        name="email" 
                        type="email" 
                        placeholder="Email" 
                        onChange={handleChange} 
                        required 
                    />
                    
                    <input 
                        className="form-input"
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        onChange={handleChange} 
                        required 
                    />

                    <button type="submit" className="btn-submit">
                        Register
                    </button>

                    <p 
                        className="login-link" 
                        onClick={() => navigate('/login')}
                    >
                        Already have an account? <span>Login</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;