import axios from 'axios';
import config from '../config';

const getAuthHeaders = () => {
    const token = localStorage.getItem('user_token');
    return token ? { Authorization: token } : {};
};

export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${config.apiUrl}/category`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error in getAllCategories:', error);
        throw error;
    }
};

export const createCategory = async (categoryData) => {
    try {
        const response = await axios.post(`${config.apiUrl}/category`, categoryData, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error in createCategory:', error);
        throw error;
    }
};

export const updateCategory = async (id, categoryData) => {
    try {
        const response = await axios.put(`${config.apiUrl}/category/${id}`, categoryData, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error in updateCategory:', error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`${config.apiUrl}/category/${id}`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error in deleteCategory:', error);
        throw error;
    }
}; 