import axios from "axios";

const api = `${import.meta.env.VITE_API_URL}/api/blog`;

// Create Blog
export const createblog = async ({ title, image }) => {
  try {
    const formData = new FormData();

    formData.append("title", title);

    if (image) {
      formData.append("image", image);
    }

    const response = await axios.post(`${api}/create`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get All Blogs
export const getallblogs = async () => {
  try {
    const response = await axios.get(`${api}/allblogs`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get Blog By ID
export const getblogbyid = async (id) => {
  try {
    const response = await axios.get(`${api}/${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get My Blogs
export const getMyBlogs = async () => {
  try {
    const response = await axios.get(`${api}/my-blogs`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete Blog
export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${api}/${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update Blog
export const updateBlog = async (id, data) => {
  try {
    const response = await axios.put(`${api}/${id}`, data, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};