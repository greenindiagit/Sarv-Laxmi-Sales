import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_PATHS from "../../api/apiUrl";
import axiosInstance from "../../api/axiosInstance";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axiosInstance.post(API_PATHS.login, {
        email,
        password,
      });

     localStorage.setItem("token", res.data.token);
      navigate("/Admin"); // ✅ Redirect to Dashboard
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
       <div className="login-card">

      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
         <button type="submit" className="login-button">→ Log in</button>
      </form>
       <div className="login-links">
          <a href="request-reset">Reset password</a>
          {/* <p>No account? <a href="#">Create one</a></p> */}
        </div>
    </div>
    </div>
  );
};

export default Login;
