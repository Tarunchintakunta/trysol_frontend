// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authServices";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("role", response.data.roles[0]);
      localStorage.setItem("token", response.headers.authorization);
      if (response.data.roles[0] === "ROLE_ADMIN") {
        console.log("Navigating to admin dashboard");
        navigate('/admin/dashboard');
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
    <div className="login-form">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  </div>
);

};

export default Login;
