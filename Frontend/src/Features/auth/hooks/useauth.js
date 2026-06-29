import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { register, login, logout } from "../services/auth.service";

export const useauth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useauth must be used inside AuthProvider");
  }

  const { user, setuser, loading, setloading } = context;

  // Login
  const handlelogin = async ({ email, password }) => {
    setloading(true);

    try {
      const data = await login({ email, password });

      setuser(data.user);

      return data;
    } catch (error) {
      throw error;
    } finally {
      setloading(false);
    }
  };

  // Register
  const handleregister = async ({ username, email, password }) => {
    setloading(true);

    try {
      const data = await register({
        username,
        email,
        password,
      });

      setuser(data.user);

      return data;
    } catch (error) {
      throw error;
    } finally {
      setloading(false);
    }
  };

  // Logout
  const handlelogout = async () => {
    setloading(true);

    try {
      const data = await logout();

      // Clear the logged-in user
      setuser(null);

      return data;
    } catch (error) {
      throw error;
    } finally {
      setloading(false);
    }
  };

  return {
    user,
    loading,
    handlelogin,
    handleregister,
    handlelogout,
  };
};