import axiosClient from './axiosClient';

const reviewApi = {
    // Yeni yorum ekle (POST)
    addReview: (reviewData) => {
        // reviewData şunları içermeli: { itemId, customerId, description, rating(varsa) }
        return axiosClient.post('/review', reviewData);
    },

    // Eğer backend'de item response içinde yorumlar gelmiyorsa,
    // ayrıca çekmek için bu kullanılır. (Senin backend DTO'sunda yorumlar item içinde geliyor,
    // ama yine de ayrı bir endpoint varsa burası kalabilir).
    fetchReviewsByItemId: (itemId) => {
        return axiosClient.get(`/review/item/${itemId}`);
    }
};

export default reviewApi;