import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import itemApi from '../../api/itemApi';
import ItemCard from '../../components/items/ItemCard'; 
import './ItemListPage.css'; 

const ItemListPage = () => {
    const { categoryId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const categoryName = location.state?.categoryName || 'Kategori';

    useEffect(() => {
        const loadItems = async () => {
            try {
                setLoading(true);
                const response = await itemApi.fetchItemsByCategoryId(categoryId);

                if (response.data && response.data.items) {
                    setItems(response.data.items);
                } else {
                    setItems([]);
                }
            } catch (err) {
                console.error(`Product list pull error:`, err);
            } finally {
                setLoading(false);
            }
        };
        loadItems();
    }, [categoryId]);

    const handleItemSelect = (itemId) => {
        navigate(`/menu/detail/${categoryId}/${itemId}`);
    };

    if (loading) return (
        <div className="item-list-container">
            <div className="loading-msg">Items are brewing... ☕</div>
        </div>
    );

    return (
        <div className="item-list-container">
            
            <div className="list-header">
                <button
                    className="btn-back-list"
                    onClick={() => navigate('/menu')}
                >
                    ← Return to Categories
                </button>

                <h3 className="list-title">{categoryName}</h3>
            </div>

            <div className="items-grid">
                {items.length > 0 ? (
                    items.map(item => (
                        <ItemCard
                            key={item.id}
                            itemData={item}
                            onSelectItem={handleItemSelect}
                        />
                    ))
                ) : (
                    <p className="empty-msg">There are no products in this category yet...</p>
                )}
            </div>
        </div>
    );
};

export default ItemListPage;