import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import reviewApi from '../../api/reviewApi';
import { AuthContext } from '../../context/AuthContext';
import ReviewList from '../../components/reviews/ReviewList';
import './ItemDetailPage.css'; 

const ItemDetailPage = () => {
    const { itemId } = useParams(); 
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadDetail = async () => {
            try {
                setLoading(true);
                const response = await reviewApi.fetchReviewsByItemId(itemId);
                const data = response.data;
                console.log("Product with review:", data);
                setItem(data);
                setReviews(data.reviews || []);
            } catch (err) {
                console.error("Detail drawing error:", err);
            } finally {
                setLoading(false);
            }
        };
        loadDetail();
    }, [itemId]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        if (!user || !user.userId) {
            alert("You must be logged in to post a comment.");
            navigate('/login');
            return;
        }

        if (!reviewText.trim()) return alert("Please write a comment.");

        setSubmitting(true);
        try {
            const newReviewRequest = {
                itemId: Number(itemId),
                description: reviewText,
                customerId: Number(user.userId)
            };

            await reviewApi.addReview(newReviewRequest);
            alert("Your comment has been added successfully!");
            setReviewText('');
            window.location.reload(); 
        } catch (error) {
            console.error("Comment posting error:", error);
            alert("Comment could not be sent.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="item-detail-container">
            <div style={{fontSize: '1.2rem', color: '#6f4e37'}}>Product details are loading... ☕</div>
        </div>
    );
    
    if (!item) return (
        <div className="item-detail-container">
            <div>Product not found.</div>
        </div>
    );

    return (
        <div className="item-detail-container">
            <button
                className="btn-back-detail"
                onClick={() => navigate(-1)}
            >
                ← Go back
            </button>

            <div className="product-hero">
                <div className="product-image-container">
                    {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="product-image" />
                    ) : (
                        <div style={{width:'100%', height:'200px', backgroundColor:'#eee', borderRadius:'15px', display:'flex', alignItems:'center', justifyContent:'center', color:'#888'}}>
                            No Picture
                        </div>
                    )}
                </div>
                
                <div className="product-info">
                    <h1 className="product-title">{item.name}</h1>
                    <div className="product-price-tag">{item.price} $</div>
                    <p className="product-description">{item.description}</p>
                </div>
            </div>

            <div className="review-form-section">
                <h4 className="review-form-title">✍️ Share Your Experience</h4>
                <form onSubmit={handleSubmitReview}>
                    <textarea
                        className="review-textarea"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows="3"
                        placeholder={user ? "What did you think of this product? How did it taste?" : "Please log in to comment."}
                        disabled={submitting || !user}
                    />
                    <div style={{ overflow: 'hidden' }}> 
                        <button
                            type="submit"
                            className="btn-submit-review"
                            disabled={submitting || !user}
                        >
                            {submitting ? 'Sending...' : 'Submit Comment'}
                        </button>
                    </div>
                </form>
            </div>

            <h3 className="reviews-section-title">⭐ Customer Reviews({reviews.length})</h3>
            <div className="reviews-container">
                <ReviewList reviews={reviews} />
            </div>
        </div>
    );
};

export default ItemDetailPage;