import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OpportunityApply.module.css";

const OpportunityApply = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/application-success");
  };

  return (
    <div className={styles.applyContainer}>
      <h1 className={styles.title}>Apply for Opportunity</h1>
      <p className={styles.subtitle}>
        Apply now by sharing your details, motivation, and resume link. This
        helps us understand why you're a great fit for the opportunity.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Full name</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Full name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email Address</label>
          <input
            className={styles.input}
            type="email"
            placeholder="Email Address"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Phone Number</label>
          <input
            className={styles.input}
            type="text"
            placeholder="0300-00-00000"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Why Are You Interested?</label>
          <textarea
            className={styles.textarea}
            rows={4}
            placeholder="Tell us why you're interested in this opportunity"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Upload Resume</label>
          <div
            className={styles.uploadBox}
            onClick={handleUploadClick}
            tabIndex={0}
            role="button"
          >
            {fileName ? (
              <span className={styles.uploadedFile}>{fileName}</span>
            ) : (
              <>Drag & drop or{" "}
                <span className={styles.uploadLink}>Click to Upload</span>
              </>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className={styles.fileInput}
              style={{ display: "none" }}
              required
              onChange={handleFileChange}
            />
          </div>
        </div>
        <button className={styles.submitBtn} type="submit">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default OpportunityApply;
