import React from "react";
import styles from "./OpportunityCard.module.css";
import humanRightsImg from "../../assets/images/Human-Rights.png";

const OpportunityCard = ({ title, description, image, date }) => {
  return (
    <div className={styles.opportunityCard}>
      <div className={styles.opportunityHeader}>{title}</div>
      <div className={styles.opportunityImage}>
        <img src={humanRightsImg} alt="Opportunity" />
      </div>
      <div className={styles.opportunityDescription}>
        <p>{description}</p>
      </div>
      <div className={styles.opportunityDetails}>
        <div className={styles.opportunityDate}>{date}</div>
      </div>
      <div className={styles.opportunityActions}>
        <button>View Opportunity</button>
      </div>
    </div>
  );
};

export default OpportunityCard;
