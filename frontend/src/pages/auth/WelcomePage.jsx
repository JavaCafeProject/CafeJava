import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css'; 

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Java Cafe</h1>
      
      <div className="button-group">
        <button 
          className="btn btn-login"
          onClick={() => navigate('/login')}
        >
          Login
        </button>

        <button 
          className="btn btn-register"
          onClick={() => navigate('/register')}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;