import React from "react";
import TestimonialsCard from "./TestimonialsCard";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    name: "Lexi",
    image: "/images/lexi.jpg",
    text:
      "Lorem ipsum dolor sit amet consectetur. Sagit Porttitor Tempor Nisi Ac Pellentesque Dui. Sit Nec Tellus Ut Dictum. Sit Nec Tellus Ut Dictum. Sit Nec Tellus Ut Dictum. Porttitor Tempor Nisi Ac Pellentesque Dui. Sit Nec Tellus Ut Dictum.",
  },
  {
    name: "Arthur",
    image: "/images/arthur.jpg",
    text:
      "Lorem ipsum dolor sit amet consectetur. Sagit Porttitor Tempor Nisi Ac Pellentesque Dui. Sit Nec Tellus Ut Dictum. Sit Nec Tellus Ut Dictum. Sit Nec Tellus Ut Dictum. Porttitor Tempor Nisi Ac Pellentesque Dui. Sit Nec Tellus Ut Dictum.",
  },
  {
    name: "John",
    image: "/images/john.jpg",
    text:
      "Lorem ipsum dolor sit amet consectetur. Sagit Porttitor Tempor Nisi Ac Pellentesque Dui. Sit Nec Tellus Ut Dictum. Sit Nec Tellus Ut Dictum. Sit Nec Tellus Ut Dictum. Porttitor Tempor Nisi Ac Pellentesque Dui. Sit Nec Tellus Ut Dictum.",
  },
];

const Testimonials = () => (
  <section className={styles.testimonialsSection}>
    <h2 className={styles.heading}>Customer Satisfaction Speaks Volumes</h2>
    <p className={styles.subheading}>
      Discover comprehensive series training courses designed to equip you with the necessary tools and
      knowledge to navigate hazardous situations with confidence.
    </p>
    <div className={styles.cardsContainer}>
      {testimonials.map((t, i) => (
        <TestimonialsCard key={i} name={t.name} image={t.image} text={t.text} />
      ))}
    </div>
  </section>
);

export default Testimonials;