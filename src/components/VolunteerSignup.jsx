import React, { useState } from "react";
import styles from "./VolunteerSignup.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import CustomAlert from "./CustomAlert";

const VolunteerSignup = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    confirmEmail: "",
    confirmPassword: "",
    terms: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [alert, setAlert] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    console.log("Volunteer registration attempt:", form);
    if (form.email !== form.confirmEmail) {
      setError("Emails do not match");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!form.terms) {
      setError("You must agree to the terms");
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register/volunteer`, {
        username: form.username,
        password: form.password,
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
      });
      console.log("Volunteer registration response:", res);
      localStorage.setItem("token", res.data.token); // Adjust if your backend returns a different key
      setAlert("Registered successfully!");
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => {
        setAlert("");
        window.location.href = "/";
      }, 1200);
    } catch (err) {
      console.error("Volunteer registration error:", err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <CustomAlert message={alert} type="success" onClose={() => setAlert("")} />
      <div className={styles.signupHeader}>
        <div className={styles.signupIcon}>
          {/* Volunteer SVG (same as RegisterSelectedType) */}
          <svg
            width="110"
            height="110"
            fill="none"
            stroke="#222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 36 36"
            style={{
              background: "#FFD600",
              borderRadius: "50%",
              padding: "10px",
            }}
          >
            <circle cx="18" cy="13" r="6" />
            <path d="M6 30c0-4 5.4-7 12-7s12 3 12 7" />
          </svg>
        </div>
        <h1 className={styles.signupTitle}>Sign Up as a Volunteer</h1>
        <div className={styles.signupSubtitle}>
          We'd love for you to join our community of people working together to
          make the world kinder, safer, and more just. Fill out some basic
          details below to kick off the process of setting up your volunteer
          profile!
        </div>
      </div>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div className={styles.signupRow}>
          <div className={styles.signupCol}>
            <label className={styles.signupLabel}>First Name*</label>
            <input
              className={styles.signupInput}
              type="text"
              placeholder="First Name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.signupCol}>
            <label className={styles.signupLabel}>Last Name*</label>
            <input
              className={styles.signupInput}
              type="text"
              placeholder="Last Name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <label className={styles.signupLabel}>Username*</label>
          <input
            className={styles.signupInput}
            type="text"
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className={styles.signupLabel}>Email Address*</label>
          <input
            className={styles.signupInput}
            type="email"
            placeholder="Email Address"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className={styles.signupLabel}>Confirm Email Address*</label>
          <input
            className={styles.signupInput}
            type="email"
            placeholder="Confirm Email Address"
            name="confirmEmail"
            value={form.confirmEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className={styles.signupLabel}>Password*</label>
          <input
            className={styles.signupInput}
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className={styles.signupLabel}>Password Confirmation*</label>
          <input
            className={styles.signupInput}
            type="password"
            placeholder="Password Confirmation"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.signupCheckboxRow}>
          <input
            className={styles.signupCheckbox}
            type="checkbox"
            id="terms"
            name="terms"
            checked={form.terms}
            onChange={() => setForm((prev) => ({ ...prev, terms: !prev.terms }))}
            required
          />
          <label htmlFor="terms" className={styles.signupTerms}>
            I agree to the <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>*
          </label>
        </div>
        <button className={styles.signupButton} type="submit">
          Create my account
        </button>
      </form>
      <div className={styles.signupFooter}>
        Already have an account?{" "}
        <Link to="/signin" className={styles.signupLink}>
          Sign In
        </Link>
      </div>
      <div className={styles.signupFooterAlt}>
        Whoops! I want to create an{" "}
        <Link to="/register/organization" className={styles.signupLink}>
          organization
        </Link>{" "}
        instead.
      </div>
    </div>
  );
};

export default VolunteerSignup;
