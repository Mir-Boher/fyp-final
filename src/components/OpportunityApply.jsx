import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./OpportunityApply.module.css";
import axios from "axios";

const OpportunityApply = () => {
  const fileInputRef = useRef(null);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const reasonRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const opportunity = location.state?.opportunity;

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setFile(e.target.files[0]);
    }
  };

  const validateFields = () => {
    const errors = {};
    if (!fullName.trim()) errors.fullName = "Full name is required.";
    if (!email.trim()) errors.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = "Invalid email address.";
    if (!phone.trim()) errors.phone = "Phone number is required.";
    if (!reason.trim()) errors.reason = "Reason is required.";
    if (!file) errors.file = "Resume is required.";
    setFieldErrors(errors);
    return errors;
  };

  const scrollToFirstError = (errors) => {
    if (errors.fullName && fullNameRef.current) fullNameRef.current.focus();
    else if (errors.email && emailRef.current) emailRef.current.focus();
    else if (errors.phone && phoneRef.current) phoneRef.current.focus();
    else if (errors.reason && reasonRef.current) reasonRef.current.focus();
    else if (errors.file && fileInputRef.current) fileInputRef.current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      scrollToFirstError(errors);
      setError("Please fill in all required fields correctly.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("opportunityId", opportunity.id);
      formData.append("full_name", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("reason", reason);
      formData.append("resume", file);
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/applications/opportunities/apply`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      navigate("/application-success");
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || "Failed to submit application. Please try again."
      );
    }
  };

  if (!opportunity) {
    return (
      <div className={styles.applyContainer}>
        <h1 className={styles.title}>No Opportunity Selected</h1>
        <p className={styles.subtitle}>Please go back and select an opportunity to apply for.</p>
        <button className={styles.submitBtn} onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className={styles.applyContainer}>
      <h1 className={styles.title}>Apply for: {opportunity.title}</h1>
      <p className={styles.subtitle}>
        Apply now by sharing your details, motivation, and resume link. This
        helps us understand why you're a great fit for the opportunity.
      </p>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.formGroup}>
          <label className={styles.label}>Full name</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            ref={fullNameRef}
            required
            style={fieldErrors.fullName ? { borderColor: '#D7263D' } : {}}
          />
          {fieldErrors.fullName && <span style={{ color: '#D7263D', fontSize: 13 }}>{fieldErrors.fullName}</span>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email Address</label>
          <input
            className={styles.input}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            ref={emailRef}
            required
            style={fieldErrors.email ? { borderColor: '#D7263D' } : {}}
          />
          {fieldErrors.email && <span style={{ color: '#D7263D', fontSize: 13 }}>{fieldErrors.email}</span>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Phone Number</label>
          <input
            className={styles.input}
            type="text"
            placeholder="0300-00-00000"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            ref={phoneRef}
            required
            style={fieldErrors.phone ? { borderColor: '#D7263D' } : {}}
          />
          {fieldErrors.phone && <span style={{ color: '#D7263D', fontSize: 13 }}>{fieldErrors.phone}</span>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Why Are You Interested?</label>
          <textarea
            className={styles.textarea}
            rows={4}
            placeholder="Tell us why you're interested in this opportunity"
            value={reason}
            onChange={e => setReason(e.target.value)}
            ref={reasonRef}
            required
            style={fieldErrors.reason ? { borderColor: '#D7263D' } : {}}
          />
          {fieldErrors.reason && <span style={{ color: '#D7263D', fontSize: 13 }}>{fieldErrors.reason}</span>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Upload Resume</label>
          <div
            className={styles.uploadBox}
            onClick={handleUploadClick}
            tabIndex={0}
            role="button"
            style={fieldErrors.file ? { borderColor: '#D7263D' } : {}}
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
          {fieldErrors.file && <span style={{ color: '#D7263D', fontSize: 13 }}>{fieldErrors.file}</span>}
        </div>
        {error && <div style={{ color: "#D7263D", marginBottom: 12 }}>{error}</div>}
        <button className={styles.submitBtn} type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default OpportunityApply;
