import react from "react";
import styles from "./HeroPortal.module.css";
import { FiSearch } from "react-icons/fi"; // Ensure you have react-icons installed

const HeroPortal = () => {
  return (
    <div className={styles.hero_container}>
      <div className={styles.heading_description_container}>
        <div className={styles.heading}>Volunteer Opportunities</div>
        <div className={styles.description}>
          Discover how you can apply for non-profits by applying the
          professional skills you have developed over years!
        </div>
      </div>
      <div className={styles.searchContainer}>
        <FiSearch className={styles.icon} />
        <input type="text" placeholder="Search..." className={styles.input} />
      </div>
    </div>
  );
};
export default HeroPortal;
