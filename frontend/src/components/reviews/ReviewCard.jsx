import React from 'react';
import './ReviewCard.css'; 

const ReviewCard = ({ reviewData }) => {
    const { description, reviewDate, customerId } = reviewData;

    const formattedDate = reviewDate 
        ? new Date(reviewDate).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) 
        : '-';

    return (
        <div className="review-card">

            <div className="review-header">
                <div className="customer-info">
                    <div className="avatar-circle">
                        👤
                    </div>
                    <span className="customer-id">
                        Customer #{customerId}
                    </span>
                </div>
                
                <span className="review-date">{formattedDate}</span>
            </div>
            
            <div className="review-body">
                {description}
            </div>
            
        </div>
    );
};

export default ReviewCard;