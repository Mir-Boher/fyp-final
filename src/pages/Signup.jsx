import React from "react";
import styles from "./Signup.module.css";

const Signup = () => {
  return (
    <div className={styles.signupContainer}>
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
        <div className={styles.signupTitle}>Sign up as a volunteer</div>
        <div className={styles.signupSubtitle}>
          We're looking forward to connecting your nonprofit with volunteers!
          Create your nonprofit profile to request inspiring, building support.
        </div>
      </div>

      <form className={styles.signupForm}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <label className={styles.signupLabel}>First name</label>
            <input
              className={styles.signupInput}
              type="text"
              placeholder="First name"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label className={styles.signupLabel}>Last name</label>
            <input
              className={styles.signupInput}
              type="text"
              placeholder="Last name"
            />
          </div>
        </div>
        <div>
          <label className={styles.signupLabel}>Email Address</label>
          <input
            className={styles.signupInput}
            type="email"
            placeholder="Email Address"
          />
        </div>
        <div>
          <label className={styles.signupLabel}>Password</label>
          <input
            className={styles.signupInput}
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <label className={styles.signupLabel}>Confirm Password</label>
          <input
            className={styles.signupInput}
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <div className={styles.signupCheckboxRow}>
          <input className={styles.signupCheckbox} type="checkbox" id="terms" />
          <label htmlFor="terms" className={styles.signupTerms}>
            I agree to the <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>
          </label>
        </div>
        <button className={styles.signupButton} type="submit">
          Create my account
        </button>
      </form>
    </div>
  );
};

export default Signup;
