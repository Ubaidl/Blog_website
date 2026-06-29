import { Link, useNavigate } from "react-router";
import { useauth } from "../hooks/useauth";
import "../style/navbar.scss"

const Navbar = () => {
  const { user, handlelogout } = useauth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await handlelogout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">
  <Link to="/" className="logo">
    Blog App
  </Link>

  <div className="nav-links">
    {user ? (
      <>
        <Link to="/createblog">Create Blog</Link>

        <Link to="/myblogs">My Blogs</Link>

        <button className="logout" onClick={logout}>
          Logout
        </button>
      </>
    ) : (
      <>
        <Link className="signin" to="/login">
          Sign In
        </Link>

        <Link className="signup" to="/signup">
          Sign Up
        </Link>
      </>
    )}
  </div>
</nav>
  );
};

export default Navbar;