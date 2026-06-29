import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import '../style/login.scss'
import { useauth } from "../hooks/useauth";



export default function Signup() {
  const navigate = useNavigate()
  const {loading,handleregister}= useauth()
  const [username,setusername] = useState("")
  const [email,setemail]= useState("")
  const [password,setpassword]= useState("")

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await handleregister({
      username,
      email,
      password,
    });

    navigate("/login");
  } catch (error) {
    alert(error.response?.data?.message || "Registration failed");
  }
};
  
  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit} >
        <h1 className="login-form__title">Signup</h1>

         <p className="login-form__error"></p>

         <label className="login-form__label" htmlFor="email">
          username
        </label>
        <input onChange={(e)=>{setusername(e.target.value)}}
          id="username"
          type="text"
          className="login-form__input"
         
          
          placeholder="you@example.com"
          required
        />

        <label className="login-form__label" htmlFor="email">
          Email
        </label>
        <input onChange={(e)=>{setemail(e.target.value)}}
          id="email"
          type="email"
          className="login-form__input"
         
          
          placeholder="you@example.com"
          required
        />

        <label className="login-form__label" htmlFor="password">
          Password
        </label>
        <input onChange={(e)=>{setpassword(e.target.value)}}
          id="password"
          type="password"
          className="login-form__input"
         
          placeholder="••••••••"
          required
        />

        <button
          type="submit"
          className="login-form__submit"
          
        >
          signup
         
        </button>

       <p className="login-form__footer">
          already have an account?{" "}
          <Link to="/login">login</Link>
        </p>
      </form>
    </div>
  );
}