import React from "react";
import styles from "./Home.module.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero/Hero";
import Testimonials from "../components/Testimonials/Testimonials";
import Footer from "../components/Footer";

const Home = () => (
  <div className={styles.homePage}>
    <Navbar />
    <main className={styles.mainContent}>
      <section className={styles.section}>
        <Hero />
      </section>
      <section className={styles.section}>
        <Testimonials />
      </section>
    </main>
    <Footer />
  </div>
);

export default Home;
