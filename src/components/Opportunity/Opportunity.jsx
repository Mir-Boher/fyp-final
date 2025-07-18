import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Opportunity.module.css";
import OpportunityCard from "./OpportunityCard";

const Opportunity = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/opportunities`);
        if (!res.ok) throw new Error("Failed to fetch opportunities");
        const data = await res.json();
        setOpportunities(data);
      } catch (err) {
        setError(err.message || "Error loading opportunities");
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunities();
  }, []);

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
      {loading && <div>Loading opportunities...</div>}
      {error && <div style={{ color: "#D7263D" }}>{error}</div>}
      <div className={styles.opportunity_list}>
        {opportunities.map((op) => (
          <OpportunityCard
            key={op.id}
            id={op.id}
            title={op.title}
            description={op.description}
            image={op.image}
            date={`Posted: ${new Date(op.start_date).toLocaleDateString()}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Opportunity;
