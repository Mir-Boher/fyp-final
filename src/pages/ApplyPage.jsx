import React from "react";
import Navbar from "../components/Navbar";
import OpportunityApply from "../components/OpportunityApply";
import Footer from "../components/Footer";
import styles from "./ApplyPage.module.css";

const ApplyPage = () => (
  <div className={styles.applyPageContainer}>
    <Navbar />
    <main className={styles.mainContent}>
      <OpportunityApply />
    </main>
    <Footer />
  </div>
);

export default ApplyPage;
