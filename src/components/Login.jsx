import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Welcome back!</h1>
      <form className={styles.loginForm}>
        <div className={styles.loginField}>
          <label htmlFor="email" className={styles.loginLabel}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className={styles.loginInput}
            placeholder="Email Address"
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
            placeholder="Password"
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
