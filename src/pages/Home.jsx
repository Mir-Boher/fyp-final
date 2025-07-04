import React from "react";
import styles from "./Home.module.css";
import Navbar from "../components/Navbar";
// import Hero from "../components/Hero/Hero";
import Testimonials from "../components/Testimonials/Testimonials";
import Opportunity from "../components/Opportunity/Opportunity";
import Impact from "../components/Impact";
import Footer from "../components/Footer";

const Home = () => (
  <div className={styles.homePage}>
    <Navbar />
    <main className={styles.mainContent}>
      {/* <section className={styles.section}>
        <Hero />
      </section> */}
      <section className={styles.section}>
        <Testimonials />
      </section>
      <section className={styles.section}>
        <Impact />
      </section>
      <section className={styles.section}>
        <Opportunity />
      </section>
    </main>
    <Footer />
  </div>
);

export default Home;
