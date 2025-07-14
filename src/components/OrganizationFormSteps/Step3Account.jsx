import React, { useState } from "react";
import styles from "./Step3Account.module.css";

const Step3Account = ({ data, setData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Username</label>
          <input
            className={styles.input}
            type="text"
            name="username"
            placeholder="Enter user name"
            required
            value={data.username}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              required
              value={data.password}
              onChange={handleChange}
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={0}
              role="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
                  <path
                    d="M1 11C2.73 6.61 6.61 3.5 11 3.5c4.39 0 8.27 3.11 10 7.5-1.73 4.39-5.61 7.5-10 7.5-4.39 0-8.27-3.11-10-7.5z"
                    stroke="#888"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="11"
                    cy="11"
                    r="3"
                    stroke="#888"
                    strokeWidth="1.5"
                  />
                </svg>
              ) : (
                <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
                  <path
                    d="M1 11C2.73 6.61 6.61 3.5 11 3.5c4.39 0 8.27 3.11 10 7.5-1.73 4.39-5.61 7.5-10 7.5-4.39 0-8.27-3.11-10-7.5z"
                    stroke="#888"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="11"
                    cy="11"
                    r="3"
                    stroke="#888"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="5"
                    y1="17"
                    x2="17"
                    y2="5"
                    stroke="#888"
                    strokeWidth="1.5"
                  />
                </svg>
              )}
            </span>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Confirm Password</label>
          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              required
              value={data.confirmPassword}
              onChange={handleChange}
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowConfirm((v) => !v)}
              tabIndex={0}
              role="button"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? (
                <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
                  <path
                    d="M1 11C2.73 6.61 6.61 3.5 11 3.5c4.39 0 8.27 3.11 10 7.5-1.73 4.39-5.61 7.5-10 7.5-4.39 0-8.27-3.11-10-7.5z"
                    stroke="#888"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="11"
                    cy="11"
                    r="3"
                    stroke="#888"
                    strokeWidth="1.5"
                  />
                </svg>
              ) : (
                <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
                  <path
                    d="M1 11C2.73 6.61 6.61 3.5 11 3.5c4.39 0 8.27 3.11 10 7.5-1.73 4.39-5.61 7.5-10 7.5-4.39 0-8.27-3.11-10-7.5z"
                    stroke="#888"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="11"
                    cy="11"
                    r="3"
                    stroke="#888"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="5"
                    y1="17"
                    x2="17"
                    y2="5"
                    stroke="#888"
                    strokeWidth="1.5"
                  />
                </svg>
              )}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step3Account;
