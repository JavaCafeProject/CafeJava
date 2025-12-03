import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagerDashboard.css'; 

const ManagerDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="manager-container">
            <h1 className="manager-title">Manager Dashboard</h1>
            
            <div className="dashboard-grid">
   
                <div 
                    className="selection-card card-orders" 
                    onClick={() => navigate('/manager/orders')}
                >
                    <span className="card-icon">📦</span>
                    <h2 className="card-title">Orders</h2>
                    <p className="card-desc">View incoming orders and manage their status.</p>
                </div>

                <div 
                    className="selection-card card-reports" 
                    onClick={() => navigate('/manager/reports')}
                >
                    <span className="card-icon">📊</span>
                    <h2 className="card-title">Reports</h2>
                    <p className="card-desc">Review sales charts and performance reports.</p>
                </div>

                <div 
                    className="selection-card card-menu" 
                    onClick={() => navigate('/manager/menu')}
                >
                    <span className="card-icon">📋</span>
                    <h2 className="card-title">Menu Management</h2>
                    <p className="card-desc">Add new products to the menu, update prices or delete products.</p>
                </div>

            </div>
        </div>
    );
}

export default ManagerDashboard;