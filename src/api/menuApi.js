import axiosClient from './axiosClient';

const menuApi = {
    // Tüm kategorileri ve içindeki ürünleri getirir
    getAllCategories: () => {
        return axiosClient.get('/menu/categories');
    },

    // Tek bir ürün detayı (gerekirse)
    getItemById: (categoryId, itemId) => {
        return axiosClient.get(`/menu/categories/${categoryId}/item/${itemId}`);
    },

    // --- YAZMA (CREATE, UPDATE, DELETE) ---
    // Yeni ürün ekle
    createItem: (itemData) => axiosClient.post('/menu/items', itemData),

    // Ürün güncelle
    updateItem: (itemId, itemData) => axiosClient.put(`/menu/item/${itemId}`, itemData),

    // Ürün sil
    deleteItem: (itemId) => axiosClient.delete(`/menu/item/${itemId}`)
};

export default menuApi;