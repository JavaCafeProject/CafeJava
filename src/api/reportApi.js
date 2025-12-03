import axiosClient from './axiosClient';

const reportApi = {
    getDailySales: () => axiosClient.get('/report/daily-sales'),
    getRevenue: () => axiosClient.get('/report/revenue'),
    getTopProducts: () => axiosClient.get('/report/top-products'),
    getEmployeePerformance: () => axiosClient.get('/report/employee-performance')
};

export default reportApi;