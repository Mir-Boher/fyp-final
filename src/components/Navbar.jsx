import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* Left: Logo */}
      <div className={styles.navbar__logo}>Q-volve</div>

      {/* Center: Navigation Links */}
      <div className={styles.navbar__links}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/opportunities">Opportunities</a>
        <a href="/blogs">Blogs</a>
        <a href="/contact">Contact Us</a>
      </div>

      {/* Right: Auth Buttons */}
      <div className={styles.navbar__auth}>
        <button className={styles.navbar__login_btn}>Log In</button>
        <button className={styles.navbar__register_btn}>Register</button>
      </div>
    </nav>
  );
};

export default Navbar;
