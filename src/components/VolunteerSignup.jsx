import React from "react";
import styles from "./VolunteerSignup.module.css";
import { Link } from "react-router-dom";

const VolunteerSignup = () => {
  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupHeader}>
        <div className={styles.signupIcon}>
          {/* Volunteer SVG (same as RegisterSelectedType) */}
          <svg
            width="110"
            height="110"
            fill="none"
            stroke="#222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 36 36"
            style={{
              background: "#FFD600",
              borderRadius: "50%",
              padding: "10px",
            }}
          >
            <circle cx="18" cy="13" r="6" />
            <path d="M6 30c0-4 5.4-7 12-7s12 3 12 7" />
          </svg>
        </div>
        <h1 className={styles.signupTitle}>Sign Up as a Volunteer</h1>
        <div className={styles.signupSubtitle}>
          We'd love for you to join our community of people working together to
          make the world kinder, safer, and more just. Fill out some basic
          details below to kick off the process of setting up your volunteer
          profile!
        </div>
      </div>
      <form className={styles.signupForm}>
        <div className={styles.signupRow}>
          <div className={styles.signupCol}>
            <label className={styles.signupLabel}>First Name*</label>
            <input
              className={styles.signupInput}
              type="text"
              placeholder="First Name"
              required
            />
          </div>
          <div className={styles.signupCol}>
            <label className={styles.signupLabel}>Last Name*</label>
            <input
              className={styles.signupInput}
              type="text"
              placeholder="Last Name"
              required
            />
          </div>
        </div>
        <div>
          <label className={styles.signupLabel}>Email Address*</label>
          <input
            className={styles.signupInput}
            type="email"
            placeholder="Email Address"
            required
          />
        </div>
        <div>
          <label className={styles.signupLabel}>Confirm Email Address*</label>
          <input
            className={styles.signupInput}
            type="email"
            placeholder="Confirm Email Address"
            required
          />
        </div>
        <div>
          <label className={styles.signupLabel}>Password*</label>
          <input
            className={styles.signupInput}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label className={styles.signupLabel}>Password Confirmation*</label>
          <input
            className={styles.signupInput}
            type="password"
            placeholder="Password Confirmation"
            required
          />
        </div>
        <div className={styles.signupCheckboxRow}>
          <input
            className={styles.signupCheckbox}
            type="checkbox"
            id="terms"
            required
          />
          <label htmlFor="terms" className={styles.signupTerms}>
            I agree to the <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>*
          </label>
        </div>
        <button className={styles.signupButton} type="submit">
          Create my account
        </button>
      </form>
      <div className={styles.signupFooter}>
        Already have an account?{" "}
        <Link to="/signin" className={styles.signupLink}>
          Sign In
        </Link>
      </div>
      <div className={styles.signupFooterAlt}>
        Whoops! I want to create an{" "}
        <Link to="/register/organization" className={styles.signupLink}>
          organization
        </Link>{" "}
        instead.
      </div>
    </div>
  );
};

export default VolunteerSignup;
