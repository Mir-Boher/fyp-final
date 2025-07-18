import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Step1Basic from "../components/OrganizationFormSteps/Step1Basic";
import Step2Contact from "../components/OrganizationFormSteps/Step2Contact";
import Step3Account from "../components/OrganizationFormSteps/Step3Account";
import styles from "./OrganizationRegistration.module.css";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";

const steps = [
  { label: "Basic" },
  { label: "Contact Info" },
  { label: "Account" },
];

const TickSvg = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="9" fill="#ffd600" />
    <path
      d="M5 9.5l3 3 5-5"
      stroke="#15304b"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const OrganizationRegistration = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [alert, setAlert] = useState("");

  const [formData, setFormData] = useState({
    step1: { orgName: "", companyType: "", regNumber: "", yearFounded: "" },
    step2: {
      contactName: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      about: "",
    },
    step3: { username: "", password: "", confirmPassword: "" },
  });

  // Hide error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Validation for each step
  const validateStep = () => {
    if (step === 0) {
      const { orgName, companyType, regNumber, yearFounded } = formData.step1;
      if (!orgName || !companyType || !regNumber || !yearFounded) {
        setError("Please fill all required fields.");
        return false;
      }
      // Only allow numbers for yearFounded
      if (!/^\d{4}$/.test(yearFounded)) {
        setError("Year Founded must be a 4-digit number.");
        return false;
      }
    }
    if (step === 1) {
      const { contactName, email, phone, city, country, about } =
        formData.step2;
      if (!contactName || !email || !phone || !city || !country || !about) {
        setError("Please fill all required fields.");
        return false;
      }
    }
    if (step === 2) {
      const { username, password, confirmPassword } = formData.step3;
      if (!username || !password || !confirmPassword) {
        setError("Please fill all required fields.");
        return false;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setError("");
    if (step > 0) setStep(step - 1);
  };

  const handleCancel = () => {
    navigate("/register");
  };

  const handleRegister = async () => {
    setError("");
    setSuccess("");
    const { orgName, companyType, regNumber, yearFounded } = formData.step1;
    const { contactName, email, phone, city, country, about } = formData.step2;
    const { username, password, confirmPassword } = formData.step3;
    const payload = {
      username,
      password,
      org_name: orgName,
      company_type: companyType,
      registration_number: regNumber,
      year_founded: Number(yearFounded),
      contact_person_name: contactName,
      email,
      phone,
      city,
      country,
      about,
    };
    console.log("Organization registration attempt:", payload);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register/organization`, payload);
      console.log("Organization registration response:", res);
      localStorage.setItem("token", res.data.token); // Adjust if your backend returns a different key
      localStorage.setItem("userType", "organization");
      setAlert("Registered successfully!");
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => {
        setAlert("");
        window.location.href = "/";
      }, 1200);
    } catch (err) {
      console.error("Organization registration error:", err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const stepProps = [
    {
      data: formData.step1,
      setData: (data) => setFormData((f) => ({ ...f, step1: data })),
    },
    {
      data: formData.step2,
      setData: (data) => setFormData((f) => ({ ...f, step2: data })),
    },
    {
      data: formData.step3,
      setData: (data) => setFormData((f) => ({ ...f, step3: data })),
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <CustomAlert message={alert} type="success" onClose={() => setAlert("")} />
      <div className={styles.registrationWrapper}>
        <div className={styles.topBar}>
          <button className={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
          <div className={styles.progressBar}>
            {steps.map((s, idx) => (
              <React.Fragment key={s.label}>
                <span
                  className={
                    idx < step
                      ? styles.completedStep
                      : idx === step
                      ? styles.activeStep
                      : styles.inactiveStep
                  }
                >
                  <span className={styles.stepNumber}>
                    {idx < step ? <TickSvg /> : idx + 1}
                  </span>
                  {s.label}
                </span>
                {idx < steps.length - 1 && (
                  <span className={styles.progressLine} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className={styles.actionBtns}>
            {step > 0 && (
              <button className={styles.backBtn} onClick={handleBack}>
                Back
              </button>
            )}
            {step < steps.length - 1 ? (
              <button className={styles.nextBtn} onClick={handleNext}>
                Next
              </button>
            ) : (
              <button className={styles.registerBtn} onClick={handleRegister}>
                Register
              </button>
            )}
          </div>
        </div>
        {error && (
          <div
            style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}
          >
            {error}
          </div>
        )}
        {success && (
          <div style={{ color: "green", textAlign: "center", marginBottom: "1rem" }}>
            {success}
          </div>
        )}
        <div className={styles.formSection}>
          {step === 0 && <Step1Basic {...stepProps[0]} />}
          {step === 1 && <Step2Contact {...stepProps[1]} />}
          {step === 2 && <Step3Account {...stepProps[2]} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrganizationRegistration;
