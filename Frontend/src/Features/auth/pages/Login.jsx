import { Link } from "react-router";
import { useNavigate } from "react-router";
import "../style/login.scss";
import {useauth} from '../hooks/useauth'
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate()

  const {loading,handlelogin} = useauth()
  const [email,setenmail] = useState("")
  const [password,setpasswrod] = useState("")

  const handleSubmit = async(e)=>{
     e.preventDefault();
    try {
    await handlelogin({ email, password });

    navigate("/");
  } catch (error) {
    alert(error.response?.data?.message || "Login failed");
  }
  }

  if(loading){
    return(<main><h1>loading..........</h1></main>)
  }
  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-form__title">Log in</h1>

        <p className="login-form__error"></p>

        <label className="login-form__label" htmlFor="email">
          Email
        </label>
        <input onChange={(e)=>{setenmail(e.target.value)}}
          id="email"
          type="email"
          className="login-form__input"
          placeholder="you@example.com"
          required
        />

        <label className="login-form__label" htmlFor="password">
          Password
        </label>
        <input onChange={(e)=>{setpasswrod(e.target.value)}}
          id="password"
          type="password"
          className="login-form__input"
          placeholder="••••••••"
          required
        />

        <button type="submit" className="login-form__submit">
          Log in
        </button>

        <p className="login-form__footer">
          Don't have an account?{" "}
          <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}