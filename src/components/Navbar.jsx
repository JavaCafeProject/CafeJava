import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css'; 

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    let homeLink = "/";

    if (user.role === 'CUSTOMER') {
        homeLink = "/customer"; 
    }

    else if (user.role === 'EMPLOYEE') {
        if (user.employeeRole === 'MANAGER') {
            homeLink = "/manager";
        }
        else if (user.employeeRole === 'WAITER') {
            homeLink = "/orders";
        }
        else {
            homeLink = "/orders";
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand" onClick={() => navigate('/')}>
                <span style={{fontSize: '1.4rem'}}>☕</span> Java Cafe
            </div>

            <div className="navbar-menu">

                <Link to={homeLink} className="nav-link">
                    Home Page
                </Link>

                {user.role === 'CUSTOMER' && (
                    <Link to="/menu" className="nav-link">Menu</Link>
                )}

                <Link to="/profile" className="nav-link">My Profile</Link>

                <span className="user-role-badge">
                    {user.employeeRole ? user.employeeRole : user.role}
                </span>
                <button 
                    className="btn-logout"
                    onClick={handleLogout}
                >
                    Log Out
                </button>
            </div>
        </nav>
    );
};

export default Navbar;