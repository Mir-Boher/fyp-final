import React from "react";
import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__container}>
      <div className={styles.footer__column}>
        <div className={styles.footer__heading}>About Us</div>
        <a href="#" className={styles.footer__link}>
          Our Mission
        </a>
        <a href="#" className={styles.footer__link}>
          Our Team
        </a>
        <a href="#" className={styles.footer__link}>
          Our Impact
        </a>
      </div>
      <div className={styles.footer__column}>
        <div className={styles.footer__heading}>Get Involved</div>
        <a href="#" className={styles.footer__link}>
          Volunteer
        </a>
        <a href="#" className={styles.footer__link}>
          Donate
        </a>
        <a href="#" className={styles.footer__link}>
          Partner with Us
        </a>
      </div>
      <div className={styles.footer__column}>
        <div className={styles.footer__heading}>Resources</div>
        <a href="#" className={styles.footer__link}>
          Blog
        </a>
        <a href="#" className={styles.footer__link}>
          FAQ
        </a>
        <a href="#" className={styles.footer__link}>
          Contact Us
        </a>
      </div>
      <div className={styles.footer__column}>
        <div className={styles.footer__heading}>Connect</div>
        <a href="#" className={styles.footer__link}>
          Facebook
        </a>
        <a href="#" className={styles.footer__link}>
          Twitter
        </a>
        <a href="#" className={styles.footer__link}>
          Instagram
        </a>
        <a href="#" className={styles.footer__link}>
          LinkedIn
        </a>
      </div>
    </div>
    <hr className={styles.footer__divider} />
    <div className={styles.footer__copyright}>
      © 2025 Q-volve. All rights reserved.
    </div>
  </footer>
);
export default Footer;
