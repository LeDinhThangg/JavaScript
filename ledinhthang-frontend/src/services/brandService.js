import axiosClient from "@/lib/axiosClient";



export const getBrands = async (params = {}) => {
    try {
        return await axiosClient.get('/Brands', { params })
    }
    catch (error) {
        throw error;

    }
};

export const getBrandById = async (id, params = {}) => {
    try {
        return await axiosClient.get(`/brands/${id}`, { params });
    }
    catch (error) {
        throw error;

    }
};