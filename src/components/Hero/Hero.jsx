import React from "react";
import styles from "./Hero.module.css";
import { Link } from "react-router-dom";
import VolunteeringGroup from "../../assets/images/Volunteering-Group.png";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          We get nonprofits the
          <br />
          support they need for free.
        </h1>
        <p className={styles.heroSubtitle}>
          You make the world a better place, but you can't do it alone.
          <br />
          Q-Volve is a nonprofit that connects social causes with skilled
          volunteers to strengthen organizations — and communities.
        </p>
        <Link to="/register" className={styles.heroButton}>
          Get Started <FaArrowRight className={styles.arrowIcon} />
        </Link>
      </div>
      <div className={styles.heroImageWrapper}>
        <img
          src={VolunteeringGroup}
          alt="Volunteering Group"
          className={styles.heroImage}
        />
      </div>
    </section>
  );
};

export default Hero;
