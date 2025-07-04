import React, { useState } from "react";
import styles from "./SkillsFilter.module.css";

const skills = [
  "Accounting & Finance",
  "Business Planning & Development",
  "Design & Creative",
  "HR & Leadership Development",
  "Information Technology",
];

const SkillsFilter = ({ selectedSkill, onSelectSkill }) => {
  return (
    <div className={styles.skillsFilterWrapper}>
      <span className={styles.skillsLabel}>Skills :</span>
      <div className={styles.skillsList}>
        {skills.map((skill) => (
          <button
            key={skill}
            className={`${styles.skillBtn} ${
              selectedSkill === skill ? styles.active : ""
            }`}
            onClick={() => onSelectSkill(skill)}
            type="button"
          >
            {skill}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SkillsFilter;
