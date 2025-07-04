import React from "react";
import styles from "./Impact.module.css";

const Impact = () => {
  return (
    <section className={styles.impactContainer}>
      <div className={styles.heading}>Impact</div>
      <div className={styles.impact_stats_container}>
        <div className={styles.impact_stats_block}>
          <div className={styles.statNumber}>$300M+</div>
          <div className={styles.statDescription}>Services Delivered</div>
        </div>
        <div className={`${styles.impact_stats_block} ${styles.leftBorder}`}>
          <div className={styles.statNumber}>19,000+</div>
          <div className={styles.statDescription}>Organizations Supported</div>
        </div>
        <div className={`${styles.impact_stats_block} ${styles.leftBorder}`}>
          <div className={styles.statNumber}>175,000+</div>
          <div className={styles.statDescription}>
            Volunteer Community Members
          </div>
        </div>
        <div className={`${styles.impact_stats_block} ${styles.leftBorder}`}>
          <div className={styles.statNumber}>1.9M+</div>
          <div className={styles.statDescription}>Donated Volunteer Hours</div>
        </div>
      </div>
    </section>
  );
};
export default Impact;
