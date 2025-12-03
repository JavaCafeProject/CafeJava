import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import menuApi from '../../api/menuApi';
import './ManagerMenuPage.css'; 

const ManagerMenuPage = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadMenu();
    }, []);

    const loadMenu = async () => {
        try {
            const res = await menuApi.getAllCategories();
            setCategories(res.data);
        } catch (error) {
            console.error("Failed to load menu", error);
        }
    };

    const handleDelete = async (itemId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await menuApi.deleteItem(itemId);
                alert("The product was successfully deleted.");
                loadMenu(); 
            } catch (error) {
                console.error("Delete Error:", error);
                alert("Error occurred while deleting.");
            }
        }
    };

    return (
        <div className="manager-menu-container">

            <div className="menu-header">
                <button 
                    className="btn-nav-back"
                    onClick={() => navigate('/manager')}
                >
                    ← Return to Panel
                </button>
                
                <h1 className="page-title">Menu Management</h1>
                
                <button
                    className="btn-add-new"
                    onClick={() => navigate('/manager/menu/add')}
                >
                    <span>+</span> Add New Item
                </button>
            </div>

            {categories.map((cat) => (
                <div key={cat.id} className="category-section">
                    <h2 className="category-title">{cat.name}</h2>

                    {cat.items && cat.items.length > 0 ? (
                        <div className="table-responsive"> 
                            <table className="menu-table">
                                <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Price</th>
                                        <th style={{ textAlign: 'right' }}>Transactions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cat.items.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.price} $</td>
                                            <td style={{ textAlign: 'right' }}>
                                                <button
                                                    className="action-btn btn-edit"
                                                    onClick={() => navigate(`/manager/menu/edit/${cat.id}/${item.id}`)}
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    className="action-btn btn-delete"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="empty-msg">Bu kategoride henüz ürün yok.</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ManagerMenuPage;