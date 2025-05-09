import axios from "axios";
import API_CONFIG from "@/config/api";


const axiosClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: 1000,
    headers: API_CONFIG.HEADERS,

});

// Interceptor xử lý lỗi
axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);

    }

);

axiosClient.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization; // Xóa Authorization nếu không có token
    }
    return config;
}, error => Promise.reject(error));

export default axiosClient;