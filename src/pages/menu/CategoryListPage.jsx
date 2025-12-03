import React, { useState, useEffect } from 'react';
import itemApi from '../../api/itemApi'; 
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../../components/items/CategoryCard'; 
import './CategoryListPage.css'; 

const CategoryListPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await itemApi.fetchCategories();
                setCategories(response.data);
            } catch (err) {
                console.error("Category pull error:", err);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    const handleCategorySelect = (categoryId, categoryName) => {
        navigate(`/menu/items/${categoryId}`, { state: { categoryName } });
    };

    if (loading) return (
        <div className="category-list-container">
            <div className="loading-msg">☕ Menu is being prepared...</div>
        </div>
    );

    return (
        <div className="category-list-container">
            
            <div className="category-header">
                 <div 
                    className="btn-back-dash" 
                    onClick={() => navigate('/customer')}
                >
                    ←Return to Main Screen
                </div>
                
                <h2 className="page-title">☕ Menu Categories</h2>
            </div>

            <div className="category-grid">
                {categories.map(category => (
                    <CategoryCard
                        key={category.id}
                        categoryData={category}
                        onSelectCategory={handleCategorySelect}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryListPage;