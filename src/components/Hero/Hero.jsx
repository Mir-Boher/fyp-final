import React from "react";
import styles from "./Hero.module.css";

const Hero = () => (
  <section className={styles.hero}>
    <div className={styles.heroContent}>
      <div className={styles.left}>
        <div className={styles.subtitle}>Why Use Q-volve platform?</div>
        <h1 className={styles.title}>
          In Q-volve you Support the <br />
          causes that <span className={styles.highlight}>matter</span> to you.
        </h1>
        <p className={styles.description}>
          You're making a difference, but you don't have to do it alone. Q-Volve
          connects social causes with skilled volunteers to empower
          organizations and communities.
        </p>
        <div className={styles.actions}>
          <button className={styles.primaryBtn}>Get started</button>
          <button className={styles.secondaryBtn}>
            Sign up for Q-volve <span className={styles.arrow}>&rarr;</span>
          </button>
        </div>
      </div>
      <div className={styles.right}>
        <img
          src="/images/Volunteering-Group.png"
          alt="Volunteers working together"
          className={styles.heroImg}
        />
      </div>
    </div>
  </section>
);

export default Hero;
