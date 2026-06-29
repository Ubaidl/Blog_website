import axios from "axios";

const api = "http://localhost:4000/api/blog";

export const createblog = async ({ title, image }) => {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("image", image);

  const response = await axios.post(
    `${api}/createblog`,
    formData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const getallblogs = async () => {
  try {
    const response = await axios.get(
      `${api}/allblogs`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    throw error;
  }
};

export const getMyBlogs = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/blog/myblogs",
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};