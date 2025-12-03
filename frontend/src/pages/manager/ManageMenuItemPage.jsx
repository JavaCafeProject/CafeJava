import React from "react";
import { Link } from "react-router-dom";
import './MenuItemCrudDashboard.css';

const MenuItemCrudDashboard = () => {
  return (
    <div className="crud-dashboard-container">
      <div className="crud-card">
        <h2 className="crud-title">Menu Management Panel</h2>

        <div className="crud-actions">
          
          <Link to="/manager/menu/add" className="action-link">
            <button className="crud-btn btn-add">
              ➕ Add New Item
            </button>
          </Link>

          <Link to="/manager/menu/update" className="action-link">
            <button className="crud-btn btn-update">
              ✏️ Update Item
            </button>
          </Link>

          <Link to="/manager/menu/delete" className="action-link">
            <button className="crud-btn btn-delete">
              🗑️ Delete Item
            </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default MenuItemCrudDashboard;