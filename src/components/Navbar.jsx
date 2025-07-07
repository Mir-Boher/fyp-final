import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      {/* Left: Logo */}
      <div className={styles.navbar__logo}>Q-Volve</div>

      {/* Center: Navigation Links */}
      <div className={styles.navbar__links}>
        <a href="/">Home</a>
        <a href="/create">Build a Program</a>
        <a href="/opportunities">Opportunities</a>
        <div
          className={styles.navbar__dropdown}
          onMouseEnter={() => setAboutOpen(true)}
          onMouseLeave={() => setAboutOpen(false)}
        >
          <span className={styles.navbar__dropdown_trigger}>About</span>
          {aboutOpen && (
            <div className={styles.navbar__dropdown_menu}>
              <div className={styles.dropdownDescription}>
                Get to know our nonprofit and the people
                <br />
                making our world-class programming
                <br />
                possible.
              </div>
              <div className={styles.dropdownDivider} />
              <a href="/about-us" className={styles.dropdownLink}>
                About Us
              </a>
              <a href="/donate" className={styles.dropdownLink}>
                Donate
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Right: Auth Buttons */}
      <div className={styles.navbar__auth}>
        <button
          className={styles.navbar__login_btn}
          onClick={() => navigate("/signin")}
        >
          Log In
        </button>
        <button
          className={styles.navbar__register_btn}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
