import React from 'react';
import './ItemCard.css';

const ItemCard = ({ itemData, onSelectItem }) => {
    const { id, name, price, imageUrl } = itemData;

    return (
        <div 
            className="item-card"
            onClick={() => onSelectItem(id)}
        >
            <div className="item-card-img-container">
                {imageUrl ? (
                    <img 
                        src={imageUrl} 
                        alt={name} 
                        className="item-card-img"
                        onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                ) : (
                    <div className="item-placeholder">
                        ☕
                        <span>No Picture</span>
                    </div>
                )}
            </div>

            <div className="item-card-info">
                <h4 className="item-card-title">{name}</h4>
                
                <div className="item-card-footer">
                    <span className="item-card-price">{price} $</span>
                    <span className="btn-view-detail">Review →</span>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;