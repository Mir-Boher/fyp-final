import React from "react";
import styles from "./Donate.module.css";
import charityPicture from "../assets/images/DonationPicture.png";

const CheckSvg = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="14" fill="#FFD600" />
    <path
      d="M8 15l4 4 8-8"
      stroke="#15304b"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Donate = () => {
  return (
    <div className={styles.donatePage}>
      {/* Ways to Give Section */}
      <section className={styles.waysToGiveSection}>
        <div className={styles.waysToGiveLeft}>
          <div className={styles.waysToGiveTitle}>
            <span className={styles.dot}></span>
            WAYS TO GIVE
          </div>
          <div className={styles.waysToGiveMain}>
            <h2>
              Your gift to Q-Volve helps ensure that our programs can continue
              to meet the needs of nonprofits and communities across the globe.
            </h2>
            <button className={styles.donateBtn}>Donate Now</button>
            <div className={styles.impactTitle}>Increase your impact:</div>
            <div className={styles.impactOption}>
              <div>
                <strong>
                  Make an employee contribution or volunteer match
                </strong>
                <div className={styles.impactDesc}>
                  Setup through platforms such as Benevity and YourCause
                </div>
              </div>
              <span className={styles.check}>
                <CheckSvg />
              </span>
            </div>
            <div className={styles.impactOption}>
              <div>
                <strong>Send a Check</strong>
                <div className={styles.impactDesc}>
                  Mailed to: Q-Volve Foundation, 82 Nassau St., Suite 62288, New
                  York, NY 10038
                </div>
              </div>
              <span className={styles.check}>
                <CheckSvg />
              </span>
            </div>
          </div>
        </div>
        <div className={styles.waysToGiveRight}>
          <div className={styles.impactOption}>
            <div>
              <strong>Connect with our Office of Effective Philanthropy</strong>
              <div className={styles.impactDesc}>
                Email:{" "}
                <a href="mailto:philanthropy@qvolve.org">
                  philanthropy@qvolve.org
                </a>
              </div>
            </div>
            <span className={styles.check}>
              <CheckSvg />
            </span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Your support helps us close the nonprofit resource gap.</h1>
          <p>
            Your contribution empowers Q-Volve to connect volunteers with
            organizations, driving real impact in communities through our FYP
            platform.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.donateBtn}>Donate Now</button>
          </div>
        </div>
        <div className={styles.heroArt}>
          <div className={styles.heroArtBg}></div>
          <img
            src={charityPicture}
            alt="Charity"
            className={styles.donateArt}
          />
        </div>
      </section>
    </div>
  );
};

export default Donate;
