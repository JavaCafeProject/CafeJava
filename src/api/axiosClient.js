import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    // Token EKLEMEYİN -> eğer istek login/signup endpointine gidiyorsa
    const isAuthRequest =
        config.url.includes('/auth/sign_in') ||
        config.url.includes('/auth/sign_up');

    if (!isAuthRequest && token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});


export default axiosClient;