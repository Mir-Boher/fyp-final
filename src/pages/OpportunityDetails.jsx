import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomAlert from "../components/CustomAlert";
import humanRightsImg from "../assets/images/Human-Rights.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OpportunityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [op, setOp] = useState(location.state?.opportunity || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
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
  }, [id]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };
  const defaultPhoto = humanRightsImg;
  const photos = op?.photos && op.photos.length > 0 ? op.photos : [defaultPhoto];

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
        <div style={{ maxWidth: 900, margin: "0 auto", background: "#fff", borderRadius: 18, boxShadow: "0 6px 32px rgba(0,0,0,0.10)", padding: 32, minHeight: 500 }}>
          {loading && <div style={{ fontSize: 20, color: "#888" }}>Loading...</div>}
          {error && !op && <div style={{ color: "#D7263D", fontSize: 18 }}>{error}</div>}
          {op && (
            <>
              {/* Opportunity Photos Slider */}
              <div style={{ marginBottom: 32 }}>
                <Slider {...sliderSettings}>
                  {photos.map((photo, idx) => {
                    let src;
                    // If it's a string, treat as URL; if not, treat as imported image
                    if (typeof photo === 'string') {
                      // If it's a data URL or starts with http, use as is
                      if (photo.startsWith('http') || photo.startsWith('data:')) {
                        src = photo;
                      } else {
                        src = `${import.meta.env.VITE_API_URL}/${photo}`;
                      }
                    } else {
                      src = photo; // imported image
                    }
                    return (
                      <div key={idx}>
                        <img
                          src={src}
                          alt={`Opportunity Photo ${idx + 1}`}
                          style={{ width: '100%', maxHeight: 350, objectFit: 'cover', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
                          onError={e => { e.target.onerror = null; e.target.src = humanRightsImg; }}
                        />
                      </div>
                    );
                  })}
                </Slider>
              </div>
              <h1 style={{ fontSize: 32, fontWeight: 800, color: "#15304b", marginBottom: 12 }}>{op.title}</h1>
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