import React from 'react';
import ReviewCard from './ReviewCard';
import './ReviewList.css'; 

const ReviewList = ({ reviews }) => {

    if (!Array.isArray(reviews)) {
        return <div className="reviews-loading">Comments are loading... ☕</div>;
    }

    if (reviews.length === 0) {
        return (
            <div className="no-reviews-box">
                <span className="no-reviews-icon">💬</span>
                <p className="no-reviews-text">There are no comments yet for this product..</p>
                <p className="no-reviews-subtext">Be the first to comment and share your experience!</p>
            </div>
        );
    }

    return (
        <div className="review-list-container">
            {reviews.map(review => (
                <ReviewCard key={review.id} reviewData={review} />
            ))}
        </div>
    );
};

export default ReviewList;