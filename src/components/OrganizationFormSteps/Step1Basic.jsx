import React from "react";
import styles from "./Step1Basic.module.css";

const Step1Basic = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Organization Name <span className={styles.required}>*</span>
          </label>
          <input
            className={styles.input}
            type="text"
            name="orgName"
            placeholder="Enter organization name"
            required
            value={data.orgName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Company Type <span className={styles.required}>*</span>
          </label>
          <input
            className={styles.input}
            type="text"
            name="companyType"
            placeholder="Enter company type"
            required
            value={data.companyType}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Registration Number <span className={styles.required}>*</span>
          </label>
          <textarea
            className={styles.textarea}
            name="regNumber"
            placeholder="Enter registration number"
            rows={3}
            required
            value={data.regNumber}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Year Founded <span className={styles.required}>*</span>
          </label>
          <input
            className={styles.input}
            type="text"
            name="yearFounded"
            placeholder="Enter year founded"
            required
            value={data.yearFounded}
            onChange={handleChange}
            pattern="\d"
            min="1000"
            max="9999"
          />
        </div>
      </form>
    </div>
  );
};

export default Step1Basic;
