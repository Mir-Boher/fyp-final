import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroPortal from "../components/HeroPortal";
import Footer from "../components/Footer";
import SkillsFilter from "../components/SearchAndFilters/SkillsFilter";
import FilterDropdown from "../components/SearchAndFilters/FilterDropdown";
import styles from "./VolunteerPortal.module.css";

const causes = ["Cause", "Education", "Health", "Environment"];
const orgTypes = ["Organization Type", "Nonprofit", "NGO", "Charity"];
const timeCommitments = ["Time Commitment", "One-time", "Weekly", "Monthly"];

const VolunteerPortal = () => {
  const [selectedSkill, setSelectedSkill] = useState(" Design & Creative");
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
        {/* Other portal content goes here */}
      </main>
      <Footer />
    </div>
  );
};

export default VolunteerPortal;
