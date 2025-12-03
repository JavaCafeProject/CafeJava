import axiosClient from './axiosClient';

const authApi = {
    login: (email, password) => {
        // Backend'in beklediği LoginRequest formatı
        return axiosClient.post('/auth/sign_in', { email, password });
    },
    register: (registerData) => {
        // Backend'in beklediği RegisterRequest formatı
        return axiosClient.post('/auth/sign_up', registerData);
    },
    getProfile: () => {
        return axiosClient.get('/auth/profile');
    }
};

export default authApi;