import React from "react";
import styles from "./Step2Contact.module.css";

const Step2Contact = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Contact person name <span className={styles.required}>*</span>
          </label>
          <input
            className={styles.input}
            type="text"
            name="contactName"
            placeholder="Enter contact person name"
            required
            value={data.contactName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Email Address <span className={styles.required}>*</span>
          </label>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Enter email address"
            required
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Phone Number <span className={styles.required}>*</span>
          </label>
          <input
            className={styles.input}
            type="text"
            name="phone"
            placeholder="Enter phone number"
            required
            value={data.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            City <span className={styles.required}>*</span>
          </label>
          <input
            className={styles.input}
            type="text"
            name="city"
            placeholder="Enter city"
            required
            value={data.city}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Country <span className={styles.required}>*</span>
          </label>
          <input
            className={styles.input}
            type="text"
            name="country"
            placeholder="Enter country"
            required
            value={data.country}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            About The Organization <span className={styles.required}>*</span>
          </label>
          <textarea
            className={styles.textarea}
            name="about"
            placeholder="Describe your organization"
            rows={3}
            required
            value={data.about}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default Step2Contact;