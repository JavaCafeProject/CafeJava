import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderCard.css'; 

const OrderCard = ({ order }) => {
    const navigate = useNavigate();

    const getStatusClass = (status) => {
        switch (status) {
            case 'ORDER_RECEIVED': return 'status-received';
            case 'PREPARING': return 'status-preparing';
            case 'READY': return 'status-ready';
            case 'ORDER_CANCELED': return 'status-canceled';
            default: return 'status-default';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'ORDER_RECEIVED': return 'Alındı';
            case 'PREPARING': return 'Hazırlanıyor';
            case 'READY': return 'Hazır';
            case 'ORDER_CANCELED': return 'İptal';
            default: return status;
        }
    };

    return (
        <div className="manager-order-card">
            <div className="card-header">
                <span className="order-id-badge">#{order.id}</span>
                <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {getStatusText(order.status)}
                </span>
            </div>

            <div className="card-body">
                <div className="info-row">
                    <span className="info-label">Customer:</span>
                    <span className="info-value">{order.customerName || 'Guest'}</span>
                </div>
                
                <div className="info-row">
                    <span className="info-label">Date:</span>
                    <span className="info-value">
                        {new Date(order.orderDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        <br/>
                        <span style={{fontSize:'0.8em', color:'#999'}}>
                            {new Date(order.orderDate).toLocaleDateString()}
                        </span>
                    </span>
                </div>

                <div className="info-row">
                    <span className="info-label">Amount:</span>
                    <span className="info-value price-value">{order.totalPrice} $</span>
                </div>
            </div>
            
            <button 
                className="btn-view-details"
                onClick={() => navigate(`/orders/${order.id}`)}
            >
                👁️ View Details
            </button>
        </div>
    );
};

export default OrderCard;