import axiosClient from "@/lib/axiosClient";



export const getCarousels = async (params = {}) => {
    try {
        return await axiosClient.get('/carousels', { params })
    }
    catch (error) {
        throw error;

    }
};

export const getCarouselById = async (id, params = {}) => {
    try {
        return await axiosClient.get(`/carousels/${id}`, { params });
    }
    catch (error) {
        throw error;

    }
};