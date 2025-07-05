import React from "react";
import styles from "./RegisterSelectedType.module.css";

const RegisterSelectedType = ({ onSelect }) => (
  <div className={styles.container}>
    <h1 className={styles.heading}>Get Started</h1>
    <div className={styles.subheading}>Please select one...</div>
    <div className={styles.options}>
      <div className={styles.option} onClick={() => onSelect("organization")}>
        <div className={styles.iconCircle}>
          {/* Organization Icon */}
          <svg
            width="36"
            height="36"
            fill="none"
            stroke="#222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="8" y="14" width="20" height="12" rx="2" />
            <path d="M12 14V10a6 6 0 0 1 12 0v4" />
          </svg>
        </div>
        <div>
          <div className={styles.optionTitle}>Organization</div>
          <div className={styles.optionDesc}>
            I’m looking to receive volunteer assistance at my nonprofit,
            charity, school, or social good organization.
          </div>
        </div>
      </div>
      <div className={styles.option} onClick={() => onSelect("volunteer")}>
        <div className={styles.iconCircle}>
          {/* Volunteer Icon */}
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
        <div>
          <div className={styles.optionTitle}>Volunteer</div>
          <div className={styles.optionDesc}>
            I’m looking to donate my time and professional skills to causes I
            care about.
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RegisterSelectedType;
