import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const BecomeOrganizationInfo = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, background: "linear-gradient(120deg, #f7faff 0%, #e9f7ff 100%)", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 0' }}>
        <div style={{ maxWidth: 540, width: '100%', background: '#fff', borderRadius: 18, boxShadow: '0 6px 32px rgba(0,0,0,0.10)', padding: '2.5rem 2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#15304b', marginBottom: 16 }}>Become an Organization</h1>
          <div style={{ fontSize: 18, color: '#555', marginBottom: 24, lineHeight: 1.6 }}>
            <b>Are you an organization looking to make a difference?</b><br /><br />
            Register your organization on Q-Volve to post volunteer opportunities and connect with passionate people ready to help your cause.<br /><br />
            <span style={{ color: '#3cb4e7', fontWeight: 600 }}>It's easy and free!</span>
          </div>
          <div style={{ fontSize: 16, color: '#888', marginBottom: 32 }}>
            <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: 400, paddingLeft: 24, color: '#555', fontSize: 16 }}>
              <li>Register your organization account</li>
              <li>Fill out your organization profile</li>
              <li>Post opportunities to attract volunteers</li>
              <li>Manage applicants and grow your impact</li>
            </ul>
          </div>
          <button
            onClick={() => navigate("/register/organization")}
            style={{
              background: 'linear-gradient(90deg, #ffd600 0%, #ffe066 100%)',
              color: '#15304b',
              fontWeight: 700,
              border: 'none',
              borderRadius: 8,
              padding: '1rem 2.5rem',
              fontSize: '1.15rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(255, 214, 0, 0.10)',
              marginTop: 8,
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
          >
            Register as Organization
          </button>
          <div style={{ marginTop: 24, color: '#888', fontSize: 15 }}>
            Already have an account? <span style={{ color: '#3cb4e7', cursor: 'pointer', fontWeight: 600 }} onClick={() => navigate('/signin')}>Sign in</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BecomeOrganizationInfo; 