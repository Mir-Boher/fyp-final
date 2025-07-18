import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";

const PostOpportunity = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    type: "",
    description: "",
    location: "",
    start_date: "",
    end_date: "",
    commitment_type: "full-time",
    contact_email: "",
  });
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "organization") {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.type || !form.description || !form.location || !form.start_date || !form.end_date || !form.commitment_type || !form.contact_email) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/opportunities`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAlert("Opportunity posted successfully!");
      setForm({
        title: "",
        type: "",
        description: "",
        location: "",
        start_date: "",
        end_date: "",
        commitment_type: "full-time",
        contact_email: "",
      });
      setTimeout(() => {
        setAlert("");
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post opportunity.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "1.5px solid #e2e8f0",
    fontSize: 16,
    background: "#fafbfc",
    marginTop: 6,
    marginBottom: 2,
    transition: "border 0.2s",
  };
  const labelStyle = {
    display: "block",
    fontWeight: 600,
    color: "#15304b",
    marginBottom: 2,
    fontSize: 16,
  };
  const dividerStyle = {
    borderTop: "1px solid #e2e8f0",
    margin: "2rem 0 1.5rem 0",
  };

  return (
    <>
      <Navbar />
      <CustomAlert message={alert} type="success" onClose={() => setAlert("")} />
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(120deg, #f7faff 0%, #e9f7ff 100%)" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ maxWidth: 700, width: "100%", padding: 36, background: "#fff", borderRadius: 18, boxShadow: "0 6px 32px rgba(0,0,0,0.10)", minHeight: 500, margin: "3rem 0" }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: "#15304b", marginBottom: 8, letterSpacing: 1 }}>Post a New Opportunity</h1>
            <div style={{ color: "#888", fontSize: 18, marginBottom: 28 }}>
              Fill out the form below to create a new volunteer opportunity for your organization.
            </div>
            <div style={dividerStyle} />
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Title*</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Type*</label>
                <input
                  type="text"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Description*</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                  required
                />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Location*</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div style={{ marginBottom: 18, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <label style={labelStyle}>Start Date*</label>
                  <input
                    type="date"
                    name="start_date"
                    value={form.start_date}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <label style={labelStyle}>End Date*</label>
                  <input
                    type="date"
                    name="end_date"
                    value={form.end_date}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Commitment Type*</label>
                <select
                  name="commitment_type"
                  value={form.commitment_type}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                </select>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Contact Email*</label>
                <input
                  type="email"
                  name="contact_email"
                  value={form.contact_email}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
              {error && <div style={{ color: "#D7263D", marginBottom: 16, fontSize: 16 }}>{error}</div>}
              <button
                type="submit"
                style={{
                  background: "linear-gradient(90deg, #ffd600 0%, #ffe066 100%)",
                  color: "#15304b",
                  fontWeight: 700,
                  border: "none",
                  borderRadius: 8,
                  padding: "1rem 2.5rem",
                  fontSize: "1.15rem",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(255, 214, 0, 0.10)",
                  marginTop: 8,
                  transition: "background 0.2s, box-shadow 0.2s",
                }}
              >
                Post Opportunity
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PostOpportunity; 