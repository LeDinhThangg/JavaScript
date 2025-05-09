import axiosClient from "@/lib/axiosClient";



export const getCategories = async (params = {}) => {
    try {
        return await axiosClient.get('/categories', { params })
    }
    catch (error) {
        throw error;

    }
};

export const getCategoryById = async (id, params = {}) => {
    try {
        return await axiosClient.get(`/categories/${id}`, { params });
    }
    catch (error) {
        throw error;

    }
};