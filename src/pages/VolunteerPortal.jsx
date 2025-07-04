import React, { useState } from "react";
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

// Example data for multiple opportunities
const opportunities = Array.from({ length: 9 }).map((_, idx) => ({
  id: idx + 1,
  title: `Opportunity ${idx + 1}`,
  description:
    "Join us as a volunteer and help support local initiatives focused on education, health, and empowerment.",
  image: "/images/Human-Rights.png",
  date: "Posted 11 Nov, 2025",
}));

const VolunteerPortal = () => {
  const [selectedSkill, setSelectedSkill] = useState("Design & Creative");
  const [selectedCause, setSelectedCause] = useState(causes[0]);
  const [selectedOrg, setSelectedOrg] = useState(orgTypes[0]);
  const [selectedTime, setSelectedTime] = useState(timeCommitments[0]);

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
        <div className={styles.cardsContainer}>
          {opportunities.map((op) => (
            <OpportunityCard
              key={op.id}
              title={op.title}
              description={op.description}
              image={op.image}
              date={op.date}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VolunteerPortal;
