import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("jwtToken", token); // Store token in localStorage
        alert("Login successful!");
        window.location.href = "/dashboard"; // Redirect to the dashboard page
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Invalid credentials");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-section">
          <h1 className="logo">digitalflake</h1>
          <p>Welcome to Digitalflake admin</p>
        </div>
        <div className="form-section">
          <input
            type="email"
            className="input-field"
            placeholder="Email-id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
          <button className="login-button" onClick={handleLogin}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
