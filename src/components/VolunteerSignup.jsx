import React from "react";
import styles from "./VolunteerSignup.module.css";
import { Link } from "react-router-dom";

const VolunteerSignup = () => {
  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupHeader}>
        <div className={styles.signupIcon}>
          {/* Example SVG illustration */}
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
            <circle cx="55" cy="55" r="55" fill="#FFD600" />
            <path d="M35 60c10 10 30 10 40-10" stroke="#A67C52" strokeWidth="4" strokeLinecap="round" />
            <path d="M50 40c5-10 20-10 25 0" stroke="#A67C52" strokeWidth="4" strokeLinecap="round" />
            <circle cx="80" cy="35" r="3" fill="#15304b" />
            <circle cx="70" cy="30" r="2" fill="#15304b" />
            <path d="M90 40c-2 2-5 2-7 0" stroke="#15304b" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className={styles.signupTitle}>Sign Up as a Volunteer</h1>
        <div className={styles.signupSubtitle}>
          We'd love for you to join our community of people working together to make the world kinder, safer, and more just. Fill out some basic details below to kick off the process of setting up your volunteer profile!
        </div>
      </div>
      <form className={styles.signupForm}>
        <div className={styles.signupRow}>
          <div className={styles.signupCol}>
            <label className={styles.signupLabel}>First Name*</label>
            <input className={styles.signupInput} type="text" placeholder="First Name" required />
          </div>
          <div className={styles.signupCol}>
            <label className={styles.signupLabel}>Last Name*</label>
            <input className={styles.signupInput} type="text" placeholder="Last Name" required />
          </div>
        </div>
        <div>
          <label className={styles.signupLabel}>Email Address*</label>
          <input className={styles.signupInput} type="email" placeholder="Email Address" required />
        </div>
        <div>
          <label className={styles.signupLabel}>Confirm Email Address*</label>
          <input className={styles.signupInput} type="email" placeholder="Confirm Email Address" required />
        </div>
        <div>
          <label className={styles.signupLabel}>Password*</label>
          <input className={styles.signupInput} type="password" placeholder="Password" required />
        </div>
        <div>
          <label className={styles.signupLabel}>Password Confirmation*</label>
          <input className={styles.signupInput} type="password" placeholder="Password Confirmation" required />
        </div>
        <div className={styles.signupCheckboxRow}>
          <input className={styles.signupCheckbox} type="checkbox" id="terms" required />
          <label htmlFor="terms" className={styles.signupTerms}>
            I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>*
          </label>
        </div>
        <button className={styles.signupButton} type="submit">
          Create my account
        </button>
      </form>
      <div className={styles.signupFooter}>
        Already have an account? <Link to="/signin" className={styles.signupLink}>Sign In</Link>
      </div>
      <div className={styles.signupFooterAlt}>
        Whoops! I want to create an <Link to="/signup-organization" className={styles.signupLink}>organization</Link> instead.
      </div>
    </div>
  );
};

export default VolunteerSignup;