import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RegisterSelectedType from "../components/RegisterSelectedType";
import Footer from "../components/Footer";
import styles from "./RegisterType.module.css";

const RegisterType = () => {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    if (type === "volunteer") {
      navigate("/register/volunteer");
    }
    // You can add more navigation for "organization" if needed
    // else if (type === "organization") { ... }
  };

  return (
    <div className={styles.registerTypePage}>
      <Navbar />
      <div className={styles.registerTypeContent}>
        <RegisterSelectedType onSelect={handleSelect} />
      </div>
      <Footer />
    </div>
  );
};

export default RegisterType;
