import axiosClient from './axiosClient';

const itemApi = {
    // Tüm kategorileri getirir (Ekran 1)
    fetchCategories: () => {
        return axiosClient.get('/menu/categories');
    },

    // Kategori detayını ve içindeki ürünleri getirir (Ekran 2)
    // Backend'de: getCategoryById metodu "items" listesini de dönüyor.
    fetchItemsByCategoryId: (categoryId) => {
        return axiosClient.get(`/menu/categories/${categoryId}`);
    },

    // Ürün detayını getirir (Ekran 3)
    // Backend'de: /menu/categories/{catId}/item/{itemId}
    // Not: Backend yapında categoryId de isteniyor, o yüzden bu fonksiyonu güncelledik.
    fetchItemDetail: (categoryId, itemId) => {
        return axiosClient.get(`/menu/categories/${categoryId}/item/${itemId}`);
    }
};

export default itemApi;