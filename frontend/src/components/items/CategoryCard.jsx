import React from 'react';
import './CategoryCard.css'; 

const CategoryCard = ({ categoryData, onSelectCategory }) => {
    const { id, name, itemCount } = categoryData;

    return (
        <div 
            className="category-card"
            onClick={() => onSelectCategory(id, name)}
        >
            <div className="category-icon">
                ☕
            </div>

            <h3 className="category-title">{name}</h3>
            
            <div className="category-count-badge">
                {itemCount} Products
            </div>
        </div>
    );
};

export default CategoryCard;