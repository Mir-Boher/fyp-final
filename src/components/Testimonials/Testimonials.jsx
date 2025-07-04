import React from "react";
import TestimonialsCard from "./TestimonialsCard";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    name: "Alyosha Karamazov",
    image: "/images/Alyosha-Testimonial.jpg",
    text: "As someone from Balochistan, it’s inspiring to see a tech platform focused on uplifting local businesses and developers. The whole process was smooth, transparent, and empowering",
  },
  {
    name: "Lise Meitner",
    image: "/images/Lise-Testimonial.jpg",
    text: "Finally, a platform that connects developers with real clients who need quality work. It helped me build my portfolio and gain steady income while working from home.",
  },
  {
    name: "Fyodor Dostoevsky",
    image: "/images/Mitya-Testimonial.jpg",
    text: "Working with this platform was a game-changer for my business. I got a beautifully designed website within days, and my customer reach has doubled. Truly impressed by the local talent!",
  },
];

const Testimonials = () => (
  <section className={styles.testimonialsSection}>
    <h2 className={styles.heading}>Customer Satisfaction Speaks Volumes</h2>
    <p className={styles.subheading}>
      Discover comprehensive series training courses designed to equip you with
      the necessary tools and knowledge to navigate hazardous situations with
      confidence.
    </p>
    <div className={styles.cardsContainer}>
      {testimonials.map((t, i) => (
        <TestimonialsCard key={i} name={t.name} image={t.image} text={t.text} />
      ))}
    </div>
  </section>
);

export default Testimonials;
