import "./login.css";
import "./responsive.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";
export default function Login() {
  const [error, setError] = useState(false);

  const userRef = useRef();

  const passwordRef = useRef();

  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axiosInstance.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    } catch {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="email"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button
          className="loginButton"
          type="submit"
          onClick={handleSubmit}
          disabled={isFetching}
        >
          Login
        </button>
        {error && (
          <span style={{ color: "red", textAlign: "center", marginTop: 20 }}>
            Wrong username or password, please try again!
          </span>
        )}
      </form>
      <Link className="link" to="/dang-ky">
        <button className="registerButton">Register</button>
      </Link>
    </div>
  );
}
