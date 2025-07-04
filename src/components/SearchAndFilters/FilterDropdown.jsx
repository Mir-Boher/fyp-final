import React, { useState } from "react";
import styles from "./FilterDropdown.module.css";

const FilterDropdown = ({
  label = "",
  options = [],
  selected = "",
  onSelect = () => {},
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.dropdownWrapper}>
      {label && <span className={styles.dropdownLabel}>{label}</span>}
      <button
        className={styles.dropdownButton}
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        {selected || options[0]}
        <span className={styles.arrow}>&#9662;</span>
      </button>
      {open && (
        <ul className={styles.dropdownList}>
          {options.map((option) => (
            <li
              key={option}
              className={`${styles.dropdownItem} ${
                selected === option ? styles.selected : ""
              }`}
              onClick={() => {
                onSelect(option);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;