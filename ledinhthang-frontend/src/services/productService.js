import axiosClient from "@/lib/axiosClient";



export const getProducts = async (params = {}) => {
    try {
        return await axiosClient.get('/products', { params })
    }
    catch (error) {
        throw error;

    }
};

export const getProductById = async (id, params = {}) => {
    try {
        return await axiosClient.get(`/products/${id}`, { params });
    }
    catch (error) {
        throw error;

    }
}

export const updateProduct = async (id, data) => {
    try {
        return await axiosClient.put(`/products/${id}`, { "data": data })
    } catch (error) {
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        return await axiosClient.delete(`/products/${id}`)
    } catch (error) {
        throw error;
    }
};

export const createProduct = async (data) => {

    try {
        return await axiosClient.post('/products', { "data": data });
    } catch (error) {
        throw error;
    }
};
