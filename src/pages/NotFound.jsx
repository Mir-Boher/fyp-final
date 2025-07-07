import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFoundPage}>
      <Navbar />
      <div className={styles.centerContent}>
        <div className={styles.errorCode}>404</div>
        <div className={styles.message}>
          Uh oh, we can't seem to find the page you're looking for. Try going
          back to the previous page or see our{" "}
          <span className={styles.bold}>Help Center</span> for more information
        </div>
        <button className={styles.goHomeBtn} onClick={() => navigate("/")}>
          <span className={styles.arrow}>&larr;</span> Go home
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
