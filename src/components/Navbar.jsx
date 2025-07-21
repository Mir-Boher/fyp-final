import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import CustomAlert from "./CustomAlert";
import axios from "axios";

const defaultProfilePhoto =
  "https://ui-avatars.com/api/?name=Profile&background=ffd600&color=15304b&size=256";

const Navbar = () => {
  const navigate = useNavigate();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [alert, setAlert] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("userType");
    const name = localStorage.getItem("displayName");
    setIsLoggedIn(!!token);
    setUserType(type);
    setDisplayName(name);
    // Fetch profile photo if logged in
    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setProfilePhoto(res.data.user.profile_photo_url || null);
        })
        .catch(() => {
          setProfilePhoto(null);
        });
    } else {
      setProfilePhoto(null);
    }
    // Listen for profile photo updates from ProfileSettings
    const handlePhotoUpdate = (e) => {
      setProfilePhoto(e.detail.url);
    };
    window.addEventListener('profile-photo-updated', handlePhotoUpdate);
    return () => {
      window.removeEventListener('profile-photo-updated', handlePhotoUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("displayName");
    setAlert("Logged out successfully!");
    setTimeout(() => {
      setAlert("");
      window.location.href = "/";
    }, 1200);
  };

  const handleBuildProgram = (e) => {
    e.preventDefault();
    if (userType === "organization") {
      navigate("/post-opportunity");
    } else {
      navigate("/become-organization-info");
    }
  };

  return (
    <nav className={styles.navbar}>
      <CustomAlert message={alert} type="success" onClose={() => setAlert("")} />
      {/* Left: Logo */}
      <div className={styles.navbar__logo}>Q-Volve</div>
      {/* Center: Navigation Links */}
      <div className={styles.navbar__links}>
        <a href="/">Home</a>
        <a href="/create" onClick={handleBuildProgram}>Build a Program</a>
        <a href="/opportunities">Opportunities</a>
        {userType === "organization" && (
          <a href="/dashboard">Dashboard</a>
        )}
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
      {/* Right: Auth/Profile */}
      <div className={styles.navbar__auth}>
        {!isLoggedIn ? (
          <>
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
          </>
        ) : (
          <div className={styles.profileWrapper}>
            <span
              className={styles.profileIcon}
              onClick={() => setProfileOpen((prev) => !prev)}
              tabIndex={0}
              role="button"
            >
              {/* Show profile photo if available, else fallback SVG */}
              {profilePhoto ? (
                <img
                  src={profilePhoto || defaultProfilePhoto}
                  alt="Profile"
                  style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="#FFD600" />
                  <circle cx="16" cy="12" r="6" fill="#fff" />
                  <ellipse cx="16" cy="24" rx="10" ry="6" fill="#fff" />
                </svg>
              )}
            </span>
            {profileOpen && (
              <div className={styles.profileDropdown}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{displayName}</div>
                <div style={{ fontSize: 14, color: '#888', marginBottom: 8 }}>
                  {userType === "organization" ? "Organization" : "Volunteer"}
                </div>
                {userType === "organization" && (
                  <>
                    <button onClick={() => navigate("/dashboard")}>Dashboard</button>
                    <button onClick={() => navigate("/post-opportunity")}>Post Opportunity</button>
                  </>
                )}
                <button onClick={() => navigate("/profile")}>Profile Settings</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
