import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroPortal from "../components/HeroPortal";
import Footer from "../components/Footer";
import SkillsFilter from "../components/SearchAndFilters/SkillsFilter";
import FilterDropdown from "../components/SearchAndFilters/FilterDropdown";
import OpportunityCard from "../components/Opportunity/OpportunityCard";
import styles from "./VolunteerPortal.module.css";

const causes = ["Cause", "Education", "Health", "Environment"];
const orgTypes = ["Organization Type", "Nonprofit", "NGO", "Charity"];
const timeCommitments = ["Time Commitment", "One-time", "Weekly", "Monthly"];

const VolunteerPortal = () => {
  const [selectedSkill, setSelectedSkill] = useState("Design & Creative");
  const [selectedCause, setSelectedCause] = useState(causes[0]);
  const [selectedOrg, setSelectedOrg] = useState(orgTypes[0]);
  const [selectedTime, setSelectedTime] = useState(timeCommitments[0]);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/opportunities?page=${page}&limit=${limit}`);
        if (!res.ok) throw new Error("Failed to fetch opportunities");
        const data = await res.json();
        setOpportunities(data.opportunities || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err.message || "Error loading opportunities");
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunities();
  }, [page]);

  return (
    <div className={styles.volunteerPortalPage}>
      <Navbar />
      <main className={styles.mainContent}>
        <HeroPortal />
        <SkillsFilter
          selectedSkill={selectedSkill}
          onSelectSkill={setSelectedSkill}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            margin: "2rem 0",
          }}
        >
          <span style={{ fontWeight: 600, color: "#222", margin: "1rem" }}>
            Filter
          </span>
          <FilterDropdown
            options={causes}
            selected={selectedCause}
            onSelect={setSelectedCause}
          />
          <FilterDropdown
            options={orgTypes}
            selected={selectedOrg}
            onSelect={setSelectedOrg}
          />
          <FilterDropdown
            options={timeCommitments}
            selected={selectedTime}
            onSelect={setSelectedTime}
          />
        </div>
        {/* Opportunity Cards Container */}
        {loading && <div>Loading opportunities...</div>}
        {error && <div style={{ color: "#D7263D" }}>{error}</div>}
        <div className={styles.cardsContainer}>
          {opportunities.map((op) => (
            <OpportunityCard key={op.id} {...op} photos={op.photos ? op.photos.slice(0, 4) : []} date={`Posted: ${new Date(op.start_date).toLocaleDateString()}`} />
          ))}
        </div>
        {/* Pagination Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              padding: '8px 16px',
              marginRight: 8,
              borderRadius: 6,
              border: '1.5px solid #e2e8f0',
              background: page === 1 ? '#f7f8fa' : '#fff',
              color: '#15304b',
              fontWeight: 600,
              cursor: page === 1 ? 'not-allowed' : 'pointer',
              minWidth: 40,
            }}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx + 1)}
              style={{
                padding: '8px 14px',
                marginRight: 4,
                borderRadius: 6,
                border: idx + 1 === page ? '2px solid #ffd600' : '1.5px solid #e2e8f0',
                background: idx + 1 === page ? '#ffd600' : '#fff',
                color: idx + 1 === page ? '#15304b' : '#15304b',
                fontWeight: idx + 1 === page ? 700 : 600,
                cursor: 'pointer',
                minWidth: 36,
              }}
              disabled={page === idx + 1}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              padding: '8px 16px',
              marginLeft: 8,
              borderRadius: 6,
              border: '1.5px solid #e2e8f0',
              background: page === totalPages ? '#f7f8fa' : '#fff',
              color: '#15304b',
              fontWeight: 600,
              cursor: page === totalPages ? 'not-allowed' : 'pointer',
              minWidth: 40,
            }}
          >
            Next
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VolunteerPortal;
