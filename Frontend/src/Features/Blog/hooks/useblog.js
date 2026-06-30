import { useContext } from "react";
import { BlogContext } from "../Blog.context";
import {
  createblog,
  getallblogs,
  getMyBlogs,
  deleteBlog,
} from "../services/api.service";

export const useblog = () => {
  const context = useContext(BlogContext);

  const {
    blog,
    setblog,
    myBlogs,
    setMyBlogs,
  } = context;

  // Create Blog
  const handlecreateblog = async ({ title, image }) => {
    try {
      const data = await createblog({
        title,
        image,
      });

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Get All Blogs
  const handlegetallblogs = async () => {
  try {
    const data = await getallblogs();

    console.log("API Response:", data);

    setblog(data.blogs || []);

    return data;
  } catch (error) {
    console.log(error);
  }
};

  // Get My Blogs
  const handleGetMyBlogs = async () => {
  try {
    const data = await getMyBlogs();

    console.log("API Response:", data);

    setMyBlogs(data.blogs);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const handleDelete = async (id) => {
  try {
    await deleteBlog(id);

    setMyBlogs((prev) => prev.filter((blog) => blog._id !== id));

    alert("Blog deleted successfully");
  } catch (error) {
    console.error(error);
  }
};




  return {
    blog,
    myBlogs,
    handlecreateblog,
    handlegetallblogs,
    handleGetMyBlogs,
    handleDelete,
  };
};