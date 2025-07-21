import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OpportunityCard.module.css";
import humanRightsImg from "../../assets/images/Human-Rights.png";

const OpportunityCard = (op) => {
  const navigate = useNavigate();
  const { id, title, description, photos, date } = op;

  const handleView = () => {
    navigate(`/opportunity/${id}`, { state: { opportunity: op } });
  };

  // Show only the first photo, or default image if none
  const mainPhoto = (photos && photos.length > 0)
    ? (photos[0].startsWith('http') ? photos[0] : `${import.meta.env.VITE_API_URL}/${photos[0]}`)
    : humanRightsImg;

  return (
    <div className={styles.opportunityCard}>
      <div className={styles.opportunityHeader}>{title}</div>
      <div className={styles.opportunityImage}>
        <img
          src={mainPhoto}
          alt="Opportunity Thumbnail"
          style={{ width: 300, height: 300, objectFit: 'cover', borderRadius: 12, background: '#f7f8fa' }}
        />
      </div>
      <div className={styles.opportunityDescription}>
        <p>{description}</p>
      </div>
      <div className={styles.opportunityDetails}>
        <div className={styles.opportunityDate}>{date}</div>
      </div>
      <div className={styles.opportunityActions}>
        <button onClick={handleView}>View Opportunity</button>
      </div>
    </div>
  );
};

export default OpportunityCard;
