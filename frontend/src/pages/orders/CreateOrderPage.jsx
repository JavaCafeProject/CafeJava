import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import menuApi from '../../api/menuApi';
import orderApi from '../../api/orderApi';
import { AuthContext } from '../../context/AuthContext';
import './CreateOrderPage.css'; 

const CreateOrderPage = () => {
    const { user } = useContext(AuthContext);

    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [cart, setCart] = useState([]);
    const [customerId, setCustomerId] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await menuApi.getAllCategories();
                setCategories(response.data);
                if (response.data.length > 0) {
                    setActiveCategory(response.data[0]);
                }
            } catch (error) {
                console.error("Error loading menu:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.itemID === item.id);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.itemID === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, {
                    itemID: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: 1
                }];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => {
            return prevCart.map(item => {
                if (item.itemID === itemId) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            }).filter(item => item.quantity > 0);
        });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleSubmitOrder = async () => {
        if (cart.length === 0) {
            alert("Cart is empty! Please add products.");
            return;
        }
        if (!customerId) {
            alert("Please enter your Customer ID.");
            return;
        }
        if (!user || !user.userId) {
            alert("Login information not found. Please log in again..");
            return;
        }

        const orderRequest = {
            customerId: Number(customerId),
            employeeId: Number(user.userId),
            orderItems: cart.map(item => ({
                itemID: item.itemID,
                quantity: item.quantity,
                price: item.price
            }))
        };

        try {
            const response = await orderApi.createOrder(orderRequest);
            console.log("Response:", response);

            if (response.data && response.data.id) {
                alert(`✅ Order created successfully! \nOrder No: ${response.data.id}`);
                setCart([]); 
                setCustomerId('');
            } else {
                alert("The order was sent to the server but the ID was not returned.");
            }
        } catch (error) {
            console.error("Order could not be created:", error);
            alert("An error occurred while creating the order.");
        }
    };

    if (loading) return <div className="create-order-container" style={{justifyContent:'center', alignItems:'center'}}>Menü Yükleniyor... ☕</div>;

    return (
        <div className="create-order-container">

            <div className="menu-panel">
                <h2 className="menu-title">Menu</h2>
    
                <div className="category-tabs">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat)}
                            className={`cat-btn ${activeCategory?.id === cat.id ? 'active' : ''}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className="items-grid">
                    {activeCategory && activeCategory.items && activeCategory.items.map((item) => (
                        <div key={item.id} className="menu-item-card">
                            <h4 className="item-name">{item.name}</h4>
                            <p className="item-price">{item.price} $</p>
                            <button 
                                className="btn-add-cart"
                                onClick={() => addToCart(item)}
                            >
                                + Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="cart-panel">
                <div className="cart-header">
                    <h2 className="cart-title">New Order</h2>
                </div>

                <div className="cart-form">
                    <label className="form-label">Customer ID:</label>
                    <input
                        type="number"
                        className="form-input"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        placeholder="Ex: 101"
                    />
                </div>

                <div className="cart-items-container">
                    {cart.length === 0 ? (
                        <div style={{textAlign:'center', color:'#999', marginTop:'50px', fontStyle:'italic'}}>
                            The cart is still empty.
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.itemID} className="cart-item">
                                <div className="item-info-col">
                                    <h4>{item.name}</h4>
                                    <span className="item-price-detail">{item.price} $</span>
                                </div>
                                <div className="qty-controls">
                                    <button className="qty-btn btn-minus" onClick={() => removeFromCart(item.itemID)}>-</button>
                                    <span className="qty-val">{item.quantity}</span>
                                    <button className="qty-btn btn-plus" onClick={() => addToCart({ id: item.itemID, price: item.price })}>+</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer">
                    <div className="total-row">
                        <span>Total:</span>
                        <span>{calculateTotal().toFixed(2)} $</span>
                    </div>
                    <button onClick={handleSubmitOrder} className="btn-checkout">
                        Complete Order ✅
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateOrderPage;