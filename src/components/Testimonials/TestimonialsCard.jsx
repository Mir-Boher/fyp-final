import React from "react";
import styles from "./TestimonialsCard.module.css";

const TestimonialsCard = ({ name, image, text }) => (
  <div className={styles.card}>
    <img src={image} alt={name} className={styles.avatar} />
    <div className={styles.name}>{name}</div>
    <div className={styles.stars}>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <span key={i} className={styles.star}>★</span>
        ))}
    </div>
    <div className={styles.text}>{text}</div>
  </div>
);