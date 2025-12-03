import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import orderApi from '../../api/orderApi';
import OrderDetail from '../../components/orders/OrderDetail';
import { AuthContext } from '../../context/AuthContext';
import './OrderDetailPage.css'; 

const OrderDetailPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isEmployee } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isEmployee()) {
            navigate('/');
            return;
        }

        const fetchOrder = async () => {
            try {
                const response = await orderApi.getOrderById(id);
                setOrder(response.data);
            } catch (error) {
                console.error("Order details could not be retrieved:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id, isEmployee, navigate]);

    const handleUpdateStatus = async (orderId) => {
        try {
            const response = await orderApi.updateStatus(orderId);
            setOrder(response.data); 
            alert("✅ Order status updated.");
        } catch (error) {
            console.error("Status could not be updated:", error);
            alert("An error occurred while updating the status.");
        }
    };

    const handleCancelOrder = async (orderId) => {
        if (order.status !== 'ORDER_RECEIVED') {
            alert("⚠️ An order cannot be cancelled because it has been prepared or completed! Only orders in the 'Received' stage can be cancelled.");
            return; 
        }

        if (window.confirm("Are you sure you want to cancel this order?")) {
            try {
                const response = await orderApi.cancelOrder(orderId);
                setOrder(response.data);
                alert("🗑️ Order canceled.");
            } catch (error) {
                console.error("Cancellation failed:", error);
                alert("An error occurred while canceling.");
            }
        }
    };

    if (loading) return <div className="loading-msg">Bringing order details... ☕</div>;
    if (!order) return <div className="error-msg">Order not foundı.</div>;

    return (
        <div className="order-detail-page-container">
            <div className="detail-content-wrapper">
                <button 
                    className="btn-back-list"
                    onClick={() => navigate('/manager/orders')} 
                >
                    ← Return to List
                </button>
                
             
                <OrderDetail
                    order={order}
                    onUpdateStatus={handleUpdateStatus}
                    onCancelOrder={handleCancelOrder}
                />
            </div>
        </div>
    );
};

export default OrderDetailPage;