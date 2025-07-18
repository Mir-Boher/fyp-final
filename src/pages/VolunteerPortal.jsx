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

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/opportunities`);
        if (!res.ok) throw new Error("Failed to fetch opportunities");
        const data = await res.json();
        setOpportunities(data);
      } catch (err) {
        setError(err.message || "Error loading opportunities");
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunities();
  }, []);

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
            <OpportunityCard key={op.id} {...op} date={`Posted: ${new Date(op.start_date).toLocaleDateString()}`} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VolunteerPortal;
