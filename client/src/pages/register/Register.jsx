import "./register.css";
import "./responsive.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../../config";


export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmitForm = async (e) => {
    //prevent the website from reloading after clicking "Register"
    e.preventDefault();
    setError(false);
    try {
      const response = await axiosInstance.post("/auth/register", {
          username,
          email,
          password
      });
      //If there's data (registered), line 23 will
      //direct users to the login page
      response.data && window.location.replace("/dang-nhap");
    } catch(err) {
      setError(true);
    }
  }

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmitForm}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={e => setUsername(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="email"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Link style={{ textDecoration: "none" }} to="/dang-nhap">
          <button className="registerButton">Login</button>
        </Link>
      </form>
      <button className="registerLoginButton" type="submit" onClick={handleSubmitForm}>Register</button>
      {error && (<span id="error">Username or Email has been used, please use another one!</span>)}
    </div>
  );
}
