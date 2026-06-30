import { useEffect } from "react";
import { useblog } from "../hooks/useblog";
import "../style2/homepage.scss";
import Navbar from "../../auth/pages/Navber";


const Homepage = () => {
  const { blog, handlegetallblogs } = useblog();
  console.log("Blog:", blog);

  useEffect(() => {
    handlegetallblogs();
    console.log("Fetching blogs...");
  }, []);

  return (
    <>
      <Navbar />

      <div className="homepage">

        <header className="hero">
          <h1>AI Blog Generator</h1>
          <p>Create and explore AI-generated blogs in seconds.</p>
        </header>

        <div className="blog-grid">
          {(blog || []).map((item) => (
            <div className="blog-card" key={item._id}>
              <p>{item.image}</p>

  <img
    src={item.image}
    alt={item.title}
  />

              <div className="card-content">
                <h2>{item.title}</h2>

                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </>

  )
};

export default Homepage;