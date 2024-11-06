import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authServices";
import "./Login.css";
import { redirect } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await login(email, password);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("role", response.data.roles[0]);
      localStorage.setItem("token", response.headers.authorization);

      // Redirect based on user role
      if (response.data.roles[0] === "ROLE_ADMIN") {
        console.log("Navigating to admin dashboard");
        e.preventDefault();
        navigate("/admin/dashboard");
      } else {
        console.log("Navigating to user dashboard");
        e.preventDefault();
        navigate("/user/dashboard");
      }
    } catch (err) {
      if (err.response) {
        // Display specific error message from server if available
        setError(err.response.data.message || "Invalid username or password");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
