import axios from 'axios';

const api = "http://localhost:4000/api/auth";

export const register = async ({ username, email, password }) => {
    try {
        const response = await axios.post(
            `${api}/register`,
            {
                username,
                email,
                password,
            },
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const login = async ({ email, password }) => {
    try {
        const response = await axios.post(
            `${api}/login`,
            {
                email,
                password,
            },
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const logout = async () => {
    try {
        const response = await axios.post(
            `${api}/logout`,
            {},
            {
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};