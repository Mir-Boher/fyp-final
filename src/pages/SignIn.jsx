import React from "react";
import styles from "./SignIn.module.css";

const SignIn = () => {
  return (
    <div className={styles.signInContainer}>
      <div className={styles.signInTitle}>Welcome back!</div>
      <form className={styles.signInForm}>
        <div className={styles.signInDivider}>
          <hr />
          <span>Or</span>
          <hr />
        </div>
        <input
          className={styles.signInInput}
          type="email"
          placeholder="Email Address"
        />
        <input
          className={styles.signInInput}
          type="password"
          placeholder="Password"
        />
        <div className={styles.signInForgotRow}>
          <a href="#" className={styles.signInForgotLink}>
            Forgot password?
          </a>
        </div>
        <button className={styles.signInButton} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default SignIn;
