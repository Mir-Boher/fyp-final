import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const cardStyle = {
  maxWidth: 700,
  margin: "2rem auto",
  background: "#fff",
  borderRadius: 18,
  boxShadow: "0 6px 32px rgba(0,0,0,0.10)",
  padding: "2.5rem 2rem 2rem 2rem",
  minHeight: 300,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const statusColors = {
  pending: "#ffd600",
  accepted: "#4BB543",
};

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLogForm, setShowLogForm] = useState({}); // { [application_id]: true/false }
  const [logForm, setLogForm] = useState({}); // { [application_id]: { ...fields } }
  const [logError, setLogError] = useState({});
  const [logSuccess, setLogSuccess] = useState({});
  const [loggedHours, setLoggedHours] = useState({}); // { [opportunity_id]: [hours] }
  const [logLoading, setLogLoading] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "volunteer") {
      window.location.href = "/";
      return;
    }
    const fetchApplications = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/applications/my-applications`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setApplications(res.data.applications || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // Fetch logged hours for an opportunity
  const fetchLoggedHours = async (opportunity_id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/logged-hours?opportunity_id=${opportunity_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setLoggedHours(prev => ({ ...prev, [opportunity_id]: res.data.loggedHours || [] }));
    } catch (err) {
      // Optionally handle error
    }
  };

  const handleShowLogForm = (app) => {
    setShowLogForm(prev => ({ ...prev, [app.application_id]: !prev[app.application_id] }));
    setLogForm(prev => ({
      ...prev,
      [app.application_id]: {
        hours: "",
        title: "",
        description: "",
        date: "",
        location: "",
        pictures: null,
      }
    }));
    fetchLoggedHours(app.opportunity_id);
  };

  const handleLogFormChange = (application_id, e) => {
    const { name, value, files } = e.target;
    setLogForm(prev => ({
      ...prev,
      [application_id]: {
        ...prev[application_id],
        [name]: files ? files[0] : value,
      }
    }));
  };

  const handleLogSubmit = async (app, e) => {
    e.preventDefault();
    setLogLoading(prev => ({ ...prev, [app.application_id]: true }));
    setLogError(prev => ({ ...prev, [app.application_id]: "" }));
    setLogSuccess(prev => ({ ...prev, [app.application_id]: "" }));
    const formData = new FormData();
    const form = logForm[app.application_id];
    formData.append("hours", form.hours);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("date", form.date);
    formData.append("location", form.location);
    if (form.pictures) formData.append("pictures", form.pictures);
    formData.append("opportunity_title", app.opportunity_title);
    formData.append("opportunity_id", app.opportunity_id);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/logged-hours`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setLogSuccess(prev => ({ ...prev, [app.application_id]: "Hours logged successfully!" }));
      setLogForm(prev => ({ ...prev, [app.application_id]: {
        hours: "",
        title: "",
        description: "",
        date: "",
        location: "",
        pictures: null,
      }}));
      fetchLoggedHours(app.opportunity_id);
    } catch (err) {
      setLogError(prev => ({ ...prev, [app.application_id]: err.response?.data?.message || "Failed to log hours" }));
    } finally {
      setLogLoading(prev => ({ ...prev, [app.application_id]: false }));
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, background: "linear-gradient(120deg, #f7faff 0%, #e9f7ff 100%)", padding: "2rem 0" }}>
        <div style={cardStyle}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#15304b", marginBottom: 18 }}>My Applications</h1>
          {loading && <div style={{ fontSize: 20, color: "#888" }}>Loading...</div>}
          {error && <div style={{ color: "#D7263D", fontSize: 18 }}>{error}</div>}
          {!loading && !error && applications.length === 0 && (
            <div style={{ fontSize: 18, color: "#888" }}>You have not applied to any opportunities yet.</div>
          )}
          {!loading && !error && applications.length > 0 && (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 18 }}>
              <thead>
                <tr style={{ background: '#f7f8fa' }}>
                  <th style={{ padding: '10px 8px', fontWeight: 700, color: '#15304b', fontSize: 16 }}>Opportunity</th>
                  <th style={{ padding: '10px 8px', fontWeight: 700, color: '#15304b', fontSize: 16 }}>Status</th>
                  <th style={{ padding: '10px 8px', fontWeight: 700, color: '#15304b', fontSize: 16 }}>Applied At</th>
                  <th style={{ padding: '10px 8px', fontWeight: 700, color: '#15304b', fontSize: 16 }}>Resume</th>
                  <th style={{ padding: '10px 8px', fontWeight: 700, color: '#15304b', fontSize: 16 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.application_id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px 8px', fontWeight: 600, color: '#3cb4e7' }}>{app.opportunity_title}</td>
                    <td style={{ padding: '10px 8px' }}>
                      <span style={{
                        background: statusColors[app.status] || '#eee',
                        color: app.status === 'accepted' ? '#fff' : '#15304b',
                        borderRadius: 8,
                        padding: '4px 16px',
                        fontWeight: 700,
                        fontSize: 15,
                        display: 'inline-block',
                      }}>{app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span>
                    </td>
                    <td style={{ padding: '10px 8px', color: '#888', fontWeight: 500 }}>
                      {new Date(app.applied_at).toLocaleString()}
                    </td>
                    <td style={{ padding: '10px 8px' }}>
                      <a
                        href={app.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#3cb4e7', fontWeight: 600, textDecoration: 'underline' }}
                      >
                        View Resume
                      </a>
                    </td>
                    <td style={{ padding: '10px 8px' }}>
                      {app.status === 'accepted' && (
                        <button
                          style={{ background: '#ffd600', color: '#15304b', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 700, cursor: 'pointer' }}
                          onClick={() => navigate(`/log-hours/${app.opportunity_id}?title=${encodeURIComponent(app.opportunity_title)}&description=${encodeURIComponent(app.description || '')}`)}
                        >
                          Log/View Hours
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyApplications; 