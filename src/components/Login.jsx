import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";
import CustomAlert from "./CustomAlert";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Login attempt with username:", username);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        username,
        password,
      });
      console.log("Login response:", res);
      localStorage.setItem("token", res.data.token); // Adjust if your backend returns a different key
      localStorage.setItem("userType", res.data.user_type);
      if (res.data.user_type === "organization") {
        localStorage.setItem("displayName", res.data.org_name);
      } else {
        localStorage.setItem("displayName", res.data.first_name || res.data.username);
      }
      setAlert("Successfully logged in!");
      setTimeout(() => {
        setAlert("");
        window.location.href = "/";
      }, 1200);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <CustomAlert message={alert} type="success" onClose={() => setAlert("")} />
      <h1 className={styles.loginTitle}>Welcome back!</h1>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.loginField}>
          <label htmlFor="username" className={styles.loginLabel}>
            Username
          </label>
          <input
            id="username"
            type="text"
            className={styles.loginInput}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.loginField} style={{ position: "relative" }}>
          <label htmlFor="password" className={styles.loginLabel}>
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className={styles.loginInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className={styles.eyeIcon}
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={0}
            role="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              // Eye open SVG
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="#15304b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <ellipse cx="11" cy="11" rx="8" ry="5" />
                <circle cx="11" cy="11" r="2" />
              </svg>
            ) : (
              // Eye closed SVG
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="#15304b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <ellipse cx="11" cy="11" rx="8" ry="5" />
                <circle cx="11" cy="11" r="2" />
                <line x1="4" y1="18" x2="18" y2="4" />
              </svg>
            )}
          </span>
        </div>
        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
        <div className={styles.loginActions}>
          <button type="submit" className={styles.loginButton}>
            Log In
          </button>
          <a href="*" className={styles.loginLostPassword}>
            Lost password?
          </a>
        </div>
      </form>
      <div className={styles.loginSignupText}>
        Don't have an account?{" "}
        <Link to="/register" className={styles.loginSignupLink}>
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
