import React from "react";
import styles from "./OpportunityCard.module.css"; // Adjust the path as necessary
import HumanRight from "../../assets/images/Human-Rights.png"; // Adjust the path as necessary
const OpportunityCard = () => {
  return (
    <div className={styles.opportunityCard}>
      <div className={styles.opportunityHeader}>Project</div>
      <div className={styles.opportunityImage}>
        <img src={HumanRight} alt="Opportunity" />
      </div>
      <div className={styles.opportunityDescription}>
        <p>
          Join us as a volunteer and help support local initiatives focused on
          education, health, and empowerment.
        </p>
      </div>
      <div className={styles.opportunityDetails}>
        {/* <div className={styles.opportunityLocation}>Location: Remote</div> */}
        <div className={styles.opportunityDate}>Posted 11 Nov, 2025</div>
      </div>
      <div className={styles.opportunityActions}>
        <button>View Opportunity</button>
      </div>
    </div>
  );
};

export default OpportunityCard;
