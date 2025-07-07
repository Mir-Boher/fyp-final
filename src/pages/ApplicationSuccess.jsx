import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./ApplicationSuccess.module.css";

const ApplicationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.applicationSuccessContainer}>
      <div className={styles.applicationSuccessSvg}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="40" fill="#9eefff" />
          <path
            d="M24 41l13 13 19-23"
            stroke="#15304b"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className={styles.applicationSuccessTitle}>Application Submitted!</h2>
      <p className={styles.applicationSuccessMessage}>
        Thank you for applying. We’ve received your application and will review
        your details soon. If you’re shortlisted, our team will reach out to you
        via email.
      </p>
      <button
        className={styles.applicationSuccessBtn}
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default ApplicationSuccess;
