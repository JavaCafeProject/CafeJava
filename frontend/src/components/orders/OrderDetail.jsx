import React from 'react';
import './OrderDetail.css'; 

const OrderDetail = ({ order, onUpdateStatus, onCancelOrder }) => {

    const getStatusClass = (status) => {
        switch (status) {
            case 'ORDER_RECEIVED': return 'status-received';
            case 'PREPARING': return 'status-preparing';
            case 'READY': return 'status-ready';
            case 'ORDER_CANCELED': return 'status-canceled';
            default: return '';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'ORDER_RECEIVED': return 'Order Received';
            case 'PREPARING': return 'Preparing';
            case 'READY': return 'Ready / Completed';
            case 'ORDER_CANCELED': return 'Canceled';
            default: return status;
        }
    };

    const getNextStatusText = (status) => {
        if (status === 'ORDER_RECEIVED') return 'Start Preparing 🍳';
        if (status === 'PREPARING') return 'Complete Order ✅';
        return 'Tamamlandı';
    };

    const isCancelable = order.status === 'ORDER_RECEIVED';
    const isAdvanceable = order.status !== 'READY' && order.status !== 'ORDER_CANCELED';

    return (
        <div className="order-detail-card">
            
            <div className="detail-header">
                <h2 className="detail-title">Order #{order.id}</h2>
                <span className={`status-badge-lg ${getStatusClass(order.status)}`}>
                    {getStatusText(order.status)}
                </span>
            </div>

            <div className="info-grid">
                <div className="info-item">
                    <span className="info-label">Customer</span>
                    <span className="info-value">{order.customerName || 'Guest'}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Interested Personnel</span>
                    <span className="info-value">{order.employeeName || 'Not appointed'}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Date</span>
                    <span className="info-value">
                        {new Date(order.orderDate).toLocaleString('tr-TR')}
                    </span>
                </div>
            </div>

            <h3 className="items-section-title">Product List</h3>
            <ul className="items-list">
                {order.orderItems && order.orderItems.map((item) => (
                    <li key={item.itemId} className="item-row">
                        <span className="item-name-qty">
                            <strong>{item.quantity} x</strong> {item.itemName}
                        </span>
                        <span className="item-total-price">
                             {(item.price * item.quantity).toFixed(2)} $
                        </span>
                    </li>
                ))}
            </ul>

            <div className="total-section">
                Total: {order.totalPrice} $
            </div>

            <div className="action-buttons">
                {isAdvanceable && (
                    <button 
                        className="btn-action btn-advance"
                        onClick={() => onUpdateStatus(order.id)}
                    >
                        {getNextStatusText(order.status)}
                    </button>
                )}

                {isCancelable ? (
                    <button 
                        className="btn-action btn-cancel"
                        onClick={() => onCancelOrder(order.id)}
                    >
                        ⛔ Cancel Order
                    </button>
                ) : (

                    order.status !== 'ORDER_CANCELED' && order.status !== 'READY' && (
                        <button className="btn-action btn-disabled" disabled>
                            Cannot Be Canceled
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export default OrderDetail;