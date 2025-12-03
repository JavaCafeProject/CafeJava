import axiosClient from './axiosClient';

const orderApi = {
    // Yeni sipariş oluştur (POST /order)
    createOrder: (orderRequest) => {
        return axiosClient.post('/order', orderRequest);
    },

    // Siparişleri listele (GET /order/list)
    listOrders: () => {
        return axiosClient.get('/order/list');
    },

    // Tek bir siparişi getir (GET /order/{id})
    getOrderById: (id) => {
        return axiosClient.get(`/order/${id}`);
    },

    // Statü güncelle (PUT /order/{id}/status)
    updateStatus: (id) => {
        return axiosClient.put(`/order/${id}/status`);
    },

    // Sipariş iptal et (PUT /order/{id})
    cancelOrder: (id) => {
        return axiosClient.put(`/order/${id}`);
    },

    getMyOrders: (customerId) => {
        return axiosClient.get(`/order/customer/${customerId}`);
    }
};

export default orderApi;