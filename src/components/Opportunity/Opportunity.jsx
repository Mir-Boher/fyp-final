import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Opportunity.module.css";
import OpportunityCard from "./OpportunityCard";

const opportunities = [
  {
    title: "Volunteer Teacher",
    description: "Help teach children in underserved communities.",
    image: "/images/Human-Rights.png",
    date: "Posted 11 Nov, 2025",
  },
  {
    title: "Community Health Worker",
    description: "Support local health initiatives and awareness.",
    image: "/images/Human-Rights.png",
    date: "Posted 12 Nov, 2025",
  },
  {
    title: "Environmental Volunteer",
    description: "Join efforts to clean and green local parks and rivers.",
    image: "/images/Human-Rights.png",
    date: "Posted 13 Nov, 2025",
  },
];

const Opportunity = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.opportunity_container}>
      <div className={styles.opportunity_header_container}>
        <div className={styles.heading}>Latest Volunteer Opportunities</div>
        <div
          className={styles.see_all}
          onClick={() => navigate("/opportunities")}
          style={{ cursor: "pointer" }}
        >
          See All
        </div>
      </div>
      <div className={styles.opportunity_list}>
        {opportunities.map((op, idx) => (
          <OpportunityCard
            key={idx}
            title={op.title}
            description={op.description}
            image={op.image}
            date={op.date}
          />
        ))}
      </div>
    </div>
  );
};

export default Opportunity;
