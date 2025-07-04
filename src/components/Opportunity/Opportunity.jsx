import React from "react";
import styles from "./Opportunity.module.css";
import OpportunityCard from "./OpportunityCard"; // Adjust the path as necessary

const Opportunity = () => {
  return (
    <>
      <div className={styles.opportunity_container}>
        <div className={styles.opportunity_header_container}>
          <div className={styles.heading}>Latest Volunteer Opportunities </div>
          <div className={styles.see_all}>See All</div>
        </div>
        <div className={styles.opportunity_list}>
          <OpportunityCard />
          <OpportunityCard />
          <OpportunityCard />
        </div>
      </div>
    </>
  );
};

export default Opportunity;
