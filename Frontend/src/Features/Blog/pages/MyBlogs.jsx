import { useEffect } from "react";
import { useblog } from "../hooks/useblog";
import "../style2/MyBlogs.scss";

const MyBlogs = () => {
  const { myBlogs, handleGetMyBlogs } = useblog();

  useEffect(() => {
    handleGetMyBlogs();
  }, []);

  return (
    <div className="myblogs">
      <h1>My Blogs</h1>

      {myBlogs.length === 0 ? (
        <div className="empty">
          <h2>No blogs found.</h2>
        </div>
      ) : (
        <div className="blog-grid">
          {myBlogs.map((blog) => (
            <div className="blog-card" key={blog._id}>
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                />
              )}

              <div className="card-content">
                <h2>{blog.title}</h2>
                <p>{blog.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;