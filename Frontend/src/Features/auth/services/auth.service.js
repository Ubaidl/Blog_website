import axios from "axios";

const api = `${import.meta.env.VITE_API_URL}/api/auth`;

// Register
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

// Login
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

// Logout
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