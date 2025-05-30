import axios from 'axios';
import config from '../config';

const getAuthHeaders = () => {
    const token = localStorage.getItem('user_token');
    return token ? { Authorization: token } : {};
};

export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${config.apiUrl}/product`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error in getAllProducts:', error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const formData = new FormData();
        Object.keys(productData).forEach(key => {
            if (productData[key] !== null) {
                formData.append(key, productData[key]);
            }
        });

        const response = await axios.post(`${config.apiUrl}/product`, formData, {
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in createProduct:', error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const formData = new FormData();
        Object.keys(productData).forEach(key => {
            if (productData[key] !== null) {
                formData.append(key, productData[key]);
            }
        });

        const response = await axios.put(`${config.apiUrl}/product/${id}`, formData, {
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in updateProduct:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${config.apiUrl}/product/${id}`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error in deleteProduct:', error);
        throw error;
    }
}; 