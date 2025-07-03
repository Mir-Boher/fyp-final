import React from "react";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "#ffd600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.2rem auto",
          }}
        >
          <svg
            width="36"
            height="36"
            fill="none"
            stroke="#222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="13" r="6" />
            <path d="M6 30c0-4 5.4-7 12-7s12 3 12 7" />
          </svg>
        </div>
        <div className={styles.loginTitle}>Sign up as a volunteer</div>
        <div className={styles.loginSubtitle}>
          We're looking forward to connecting your nonprofit with volunteers!
          Create your nonprofit profile to request inspiring, building support.
        </div>
      </div>

      {/* Or divider */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          margin: "1.5rem 0",
        }}
      >
        <hr style={{ flex: 1, border: "none", borderTop: "1px solid #eee" }} />
        <span style={{ margin: "0 1rem", color: "#888" }}>Or</span>
        <hr style={{ flex: 1, border: "none", borderTop: "1px solid #eee" }} />
      </div>

      <form className={styles.loginForm}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <label className={styles.loginLabel}>First name</label>
            <input
              className={styles.loginInput}
              type="text"
              placeholder="First name"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label className={styles.loginLabel}>Last name</label>
            <input
              className={styles.loginInput}
              type="text"
              placeholder="Last name"
            />
          </div>
        </div>
        <div>
          <label className={styles.loginLabel}>Email Address</label>
          <input
            className={styles.loginInput}
            type="email"
            placeholder="Email Address"
          />
        </div>
        <div>
          <label className={styles.loginLabel}>Password</label>
          <input
            className={styles.loginInput}
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <label className={styles.loginLabel}>Confirm Password</label>
          <input
            className={styles.loginInput}
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <div className={styles.loginCheckboxRow}>
          <input className={styles.loginCheckbox} type="checkbox" id="terms" />
          <label htmlFor="terms" className={styles.loginTerms}>
            I agree to the <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>
          </label>
        </div>
        <button className={styles.loginButton} type="submit">
          Create my account
        </button>
      </form>
    </div>
  );
};

export default Login;
