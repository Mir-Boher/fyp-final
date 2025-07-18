import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomAlert from "../components/CustomAlert";
import humanRightsImg from "../assets/images/Human-Rights.png";

const OpportunityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [op, setOp] = useState(location.state?.opportunity || null);
  const [loading, setLoading] = useState(!location.state?.opportunity);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    if (op) return; // Already have data from state
    const fetchOpportunity = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/opportunities/${id}`);
        if (!res.ok) throw new Error("Failed to fetch opportunity");
        const data = await res.json();
        setOp(data);
      } catch (err) {
        setError(err.message || "Error loading opportunity");
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunity();
  }, [id, op]);

  const handleApply = () => {
    const userType = localStorage.getItem("userType");
    if (userType !== "volunteer") {
      setAlert("Only volunteers can apply for opportunities. Please log in as a volunteer.");
      return;
    }
    navigate("/apply", { state: { opportunity: op } });
  };

  return (
    <>
      <Navbar />
      <CustomAlert message={alert} type="success" onClose={() => setAlert("")} />
      <div style={{ minHeight: "100vh", background: "linear-gradient(120deg, #f7faff 0%, #e9f7ff 100%)", padding: "2rem 0" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: 36, background: "#fff", borderRadius: 18, boxShadow: "0 6px 32px rgba(0,0,0,0.10)", minHeight: 500 }}>
          {loading && <div>Loading opportunity...</div>}
          {error && <div style={{ color: "#D7263D" }}>{error}</div>}
          {op && (
            <>
              <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: 28 }}>
                <img
                  src={op.image || humanRightsImg}
                  alt="Opportunity"
                  style={{
                    width: 320,
                    height: 220,
                    objectFit: "cover",
                    borderRadius: 14,
                    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                    background: "#f7f8fa",
                  }}
                />
              </div>
              <h1 style={{ fontSize: 32, fontWeight: 800, color: "#15304b", marginBottom: 8 }}>{op.title}</h1>
              <div style={{ color: "#888", fontSize: 18, marginBottom: 18 }}>{op.type} | {op.location}</div>
              <div style={{ marginBottom: 18 }}><strong>Organization:</strong> {op.org_name}</div>
              <div style={{ marginBottom: 18 }}><strong>Description:</strong> {op.description}</div>
              <div style={{ marginBottom: 18 }}><strong>Start Date:</strong> {new Date(op.start_date).toLocaleDateString()}</div>
              <div style={{ marginBottom: 18 }}><strong>End Date:</strong> {new Date(op.end_date).toLocaleDateString()}</div>
              <div style={{ marginBottom: 18 }}><strong>Commitment Type:</strong> {op.commitment_type}</div>
              <div style={{ marginBottom: 18 }}><strong>Contact Email:</strong> {op.contact_email}</div>
              <button
                onClick={handleApply}
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
                Apply Now
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OpportunityDetails; 