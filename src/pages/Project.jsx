import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Project.module.css";
import volunteeringGroup from "../assets/images/Volunteering-Group.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Project = () => {
  const navigate = useNavigate();

  const userType = localStorage.getItem("userType");
  if (userType !== "volunteer") {
    // Show alert or redirect to login
    return;
  }

  return (
    <>
      <Navbar />
      <div className={styles.projectPage}>
        <div className={styles.projectContainer}>
          {/* Left Side: Image and Skills */}
          <div className={styles.left}>
            <img
              src={volunteeringGroup}
              alt="Volunteering Group"
              className={styles.projectImage}
            />
            <div className={styles.skillsSection}>
              <div className={styles.skillsTitle}>Relevent skills needed</div>
              <div className={styles.skillsList}>
                <span className={styles.skillTag}>Brand Strategy</span>
                <span className={styles.skillTag}>Copy Writing</span>
                <span className={styles.skillTag}>Communications</span>
              </div>
            </div>
            <div className={styles.publishedSection}>
              <div className={styles.publishedTitle}>Published Date</div>
              <div className={styles.publishedDate}>2 weeks, 4 days ago</div>
            </div>
          </div>

          {/* Right Side: Project Details */}
          <div className={styles.right}>
            <div className={styles.categoryTag}>Art, Culture, & Humanities</div>
            <h1 className={styles.projectTitle}>Key Messages Drafting</h1>
            <div className={styles.projectMeta}>
              <span className={styles.metaItem}>
                <span role="img" aria-label="project">
                  🗂️
                </span>{" "}
                Project
              </span>
              <span className={styles.metaItem}>
                <span role="img" aria-label="remote">
                  🌐
                </span>{" "}
                Remote
              </span>
              <span className={styles.metaItem}>
                <span role="img" aria-label="org">
                  👥
                </span>{" "}
                Pure Cinema USA Inc
              </span>
            </div>
            <button
              className={styles.applyBtn}
              onClick={() => navigate("/apply")}
            >
              Apply Now
            </button>
            <div className={styles.projectDescription}>
              We are searching for a volunteer who can lead the development of
              our key messages that communicate what we do, how we are
              different, and what value we bring to our stakeholders.
              <br />
              <br />
              Our ideal volunteer partner will be a creative communicator who is
              ready to dive into messaging strategy with our team!
              <br />
              <br />
              We envision a set of key messages that we can use across media and
              marketing collateral (i.e., website copy, social media posts,
              infographics, brochures, email templates, etc.).
              <br />
              The first meeting will be an opportunity for our team to provide
              you with a briefing on our core stakeholders and goals as an
              organization. We will provide the volunteer with our existing
              communications and marketing materials. In our second meeting, the
              volunteer should present a first draft. We will provide feedback
              and at least one round of revision. We may work asynchronously for
              continued feedback, and in our final meeting together, the
              volunteer will deliver the final, copyedited version.
              <br />
              <br />
              Hearts and Reels Faith Films Fundraiser: Mission Support &
              Implementation Plan
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Project;
