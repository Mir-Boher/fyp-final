import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFoundPage}>
      <Navbar />
      <div className={styles.centerContent}>
        <div className={styles.errorCode}>404</div>
        <div className={styles.message}>
          Uh Oh, We Can't Seem To Find The Page You're Looking For. Try Going Back To The Previous Page Or See Our <span className={styles.bold}>Help Center</span> For More Information
        </div>
        <button className={styles.goHomeBtn} onClick={() => navigate("/")}>
          <span className={styles.arrow}>&larr;</span> Go home
        </button>
      </div>
    </div>
  );
};

export default NotFound;