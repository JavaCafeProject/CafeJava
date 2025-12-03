import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './CustomerDashboard.css'; 

const CustomerDashboard = () => {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                
                <h1 className="dashboard-title">
                    Welcome, {user?.firstName || "Guest"}! 👋
                </h1>
                <p className="dashboard-subtitle">What should we prepare for you today??</p>

                <div className="dashboard-actions">

                    <button
                        className="dashboard-btn btn-menu"
                        onClick={() => navigate("/menu")}
                    >
                        🍽 View Menu
                    </button>

                    <button
                        className="dashboard-btn btn-orders"
                        onClick={() => navigate("/my-orders")}
                    >
                        🧾 My Orders
                    </button>
                    
                     <button
                        className="dashboard-btn btn-profile"
                        onClick={() => navigate("/profile")} 
                        style={{ backgroundColor: '#8d6e63' }}
                    >
                        👤 My Profile
                    </button>

                    <button
                        className="dashboard-btn btn-logout"
                        onClick={handleLogout}
                    >
                        🚪 Log Out
                    </button>

                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;