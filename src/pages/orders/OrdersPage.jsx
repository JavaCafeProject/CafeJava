import React, { useEffect, useState, useContext } from 'react';
import orderApi from '../../api/orderApi';
import OrderList from '../../components/orders/OrderList';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './OrdersPage.css';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isEmployee } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isEmployee()) {
            alert("You do not have permission to access this page.!");
            navigate('/');
            return;
        }

        const fetchOrders = async () => {
            try {
                const sortedOrders = response.data.sort((a, b) =>
                    new Date(b.orderDate) - new Date(a.orderDate)
                );
            } catch (error) {
                console.error("An error occurred while loading orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [isEmployee, navigate]);

    if (loading) return <div className="loading-container">Orders Loading... ☕</div>;

    return (
        <div className="orders-page-container">

            <div className="orders-header">
                <div className="header-left">
                    <h1 className="page-title">Incoming Orders</h1>
                </div>

                <button
                    className="btn-create-order"
                    onClick={() => navigate('/orders/create')}
                >
                    <span>+</span> Create New Order
                </button>
            </div>

            <OrderList orders={orders} />

        </div>
    );
};

export default OrdersPage;