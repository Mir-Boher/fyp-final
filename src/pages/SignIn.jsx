import React from "react";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import Footer from "../components/Footer";
import styles from "./SignIn.module.css";

const SignIn = () => {
  return (
    <div className={styles.signInPage}>
      <Navbar />
      <div className={styles.signInContent}>
        <Login />
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
