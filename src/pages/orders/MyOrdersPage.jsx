import React, { useEffect, useState, useContext } from 'react';
import orderApi from '../../api/orderApi';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './MyOrdersPage.css'; 

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext); 
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.userId) {
            alert("You must log in to see your orders.");
            setLoading(false);
            navigate('/login'); 
            return;
        }

        const fetchMyOrders = async () => {
            try {
                const response = await orderApi.getMyOrders(user.userId);
                const sortedOrders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
                setOrders(sortedOrders);
            } catch (error) {
                console.error("Orders could not be loaded:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyOrders();
    }, [user, navigate]);

    const getStatusClass = (status) => {
        switch (status) {
            case 'READY': return 'status-ready';
            case 'PREPARING': return 'status-preparing';
            case 'ORDER_RECEIVED': return 'status-received';
            case 'ORDER_CANCELED': return 'status-canceled';
            default: return 'status-default';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'READY': return 'Ready - Bon Appetit!';
            case 'PREPARING': return 'Getting ready...';
            case 'ORDER_RECEIVED': return 'Order Received';
            case 'ORDER_CANCELED': return 'Cancelled';
            default: return status;
        }
    };

    if (loading) return (
        <div className="my-orders-container">
            <div style={{textAlign: 'center', color: '#6f4e37', marginTop: '50px'}}>Your orders are loading... 🧾</div>
        </div>
    );

    return (
        <div className="my-orders-container">
            
            <div className="orders-header">
                <button 
                    className="btn-back-orders" 
                    onClick={() => navigate('/customer')}
                >
                    ← Return to Dashboard
                </button>
                <h2 className="page-title">My Orders</h2>
            </div>

            {orders.length === 0 ? (
                <div className="empty-orders">
                    <span className="empty-icon">☕</span>
                    <h3>You have not placed any orders yet. Return to Dashboard</h3>
                    <p>You can browse the menu and order your first coffee now!</p>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order.id} className="order-card">

                            <div className="card-header-row">
                                <div>
                                    <div className="order-id">Order #{order.id}</div>
                                    <div className="order-date">
                                        {new Date(order.orderDate).toLocaleString('tr-TR')}
                                    </div>
                                </div>
                                <div className={`status-badge ${getStatusClass(order.status)}`}>
                                    {getStatusText(order.status)}
                                </div>
                            </div>

                            <div className="order-items-box">
                                {order.orderItems.map((item) => (
                                    <div key={item.itemId} className="order-item-row">
                                        <span className="item-qty-name">
                                            {item.quantity} x {item.itemName}
                                        </span>
                                        <span>
                                            {(item.price * item.quantity).toFixed(2)} TL
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="order-total">
                                Total: {order.totalPrice} $
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrdersPage;