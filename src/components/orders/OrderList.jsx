import React from 'react';
import OrderCard from './OrderCard';
import './OrderList.css'; 

const OrderList = ({ orders }) => {
    
    if (!orders || orders.length === 0) {
        return (
            <div className="no-orders-container">
                <div className="no-orders-icon">☕</div>
                <h3 className="no-orders-text">No orders yet.</h3>
                <p className="no-orders-subtext">
                    There are currently no pending or active orders.
                    <br />New orders will appear here when they arrive.
                </p>
            </div>
        );
    }

    return (
        <div className="order-list-grid">
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    );
};

export default OrderList;