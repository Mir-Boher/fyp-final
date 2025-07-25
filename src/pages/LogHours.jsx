import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

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

const LogHours = () => {
  const { opportunity_id } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const opportunity_title = query.get("title") || "";
  const opportunity_description = query.get("description") || "";

  const [logForm, setLogForm] = useState({
    hours: "",
    title: "",
    description: "",
    date: "",
    location: "",
    pictures: null,
  });
  const [logError, setLogError] = useState("");
  const [logSuccess, setLogSuccess] = useState("");
  const [logLoading, setLogLoading] = useState(false);
  const [loggedHours, setLoggedHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opportunity, setOpportunity] = useState(null);

  useEffect(() => {
    fetchLoggedHours();
    // Fetch opportunity status
    const fetchOpportunity = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/opportunities/${opportunity_id}`);
        setOpportunity(res.data);
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchOpportunity();
    // eslint-disable-next-line
  }, [opportunity_id]);

  const fetchLoggedHours = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/logged-hours/my`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // Filter logs for this opportunity
      const allLogs = res.data.logs || [];
      const filtered = allLogs.filter(log => String(log.opportunity_id) === String(opportunity_id));
      setLoggedHours(filtered);
    } catch (err) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  const handleLogFormChange = (e) => {
    const { name, value, files } = e.target;
    setLogForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleLogSubmit = async (e) => {
    e.preventDefault();
    setLogLoading(true);
    setLogError("");
    setLogSuccess("");
    const formData = new FormData();
    formData.append("hours", logForm.hours);
    formData.append("title", logForm.title);
    formData.append("description", logForm.description);
    formData.append("date", logForm.date);
    formData.append("location", logForm.location);
    if (logForm.pictures) formData.append("pictures", logForm.pictures);
    formData.append("opportunity_title", opportunity_title);
    formData.append("opportunity_id", opportunity_id);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/logged-hours`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setLogSuccess("Hours logged successfully!");
      setLogForm({
        hours: "",
        title: "",
        description: "",
        date: "",
        location: "",
        pictures: null,
      });
      fetchLoggedHours();
    } catch (err) {
      setLogError(err.response?.data?.message || "Failed to log hours");
    } finally {
      setLogLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, background: "linear-gradient(120deg, #f7faff 0%, #e9f7ff 100%)", padding: "2rem 0" }}>
        <div style={cardStyle}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#15304b", marginBottom: 10 }}>Log Hours for Opportunity</h1>
          <div style={{ color: '#3cb4e7', fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{opportunity_title}</div>
          <div style={{ color: '#888', fontSize: 16, marginBottom: 18 }}>{opportunity_description}</div>
          {opportunity?.status === 'completed' ? (
            <div style={{ color: '#D7263D', fontWeight: 600, marginBottom: 24 }}>
              This opportunity is completed. You can no longer log hours.
            </div>
          ) : (
            <form onSubmit={handleLogSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 500, margin: '0 auto' }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <label>Hours*</label>
                  <input type="number" name="hours" min="0.1" step="0.1" value={logForm.hours} onChange={handleLogFormChange} required style={{ width: '100%' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Title*</label>
                  <input type="text" name="title" value={logForm.title} onChange={handleLogFormChange} required style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <label>Description*</label>
                <textarea name="description" value={logForm.description} onChange={handleLogFormChange} required style={{ width: '100%' }} />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <label>Date*</label>
                  <input type="date" name="date" value={logForm.date} onChange={handleLogFormChange} required style={{ width: '100%' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Location*</label>
                  <input type="text" name="location" value={logForm.location} onChange={handleLogFormChange} required style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <label>Pictures (optional)</label>
                <input type="file" name="pictures" accept="image/*" onChange={handleLogFormChange} />
              </div>
              {logError && <div style={{ color: '#D7263D' }}>{logError}</div>}
              {logSuccess && <div style={{ color: '#4BB543' }}>{logSuccess}</div>}
              <button type="submit" disabled={logLoading} style={{ background: '#3cb4e7', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 28px', fontWeight: 700, fontSize: 16, cursor: logLoading ? 'not-allowed' : 'pointer' }}>
                {logLoading ? 'Logging...' : 'Submit Hours'}
              </button>
            </form>
          )}
          <div style={{ marginTop: 32, width: '100%' }}>
            <h4 style={{ marginBottom: 8 }}>My Logged Hours</h4>
            {loading ? (
              <div style={{ fontSize: 16, color: '#888' }}>Loading...</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f7f8fa' }}>
                    <th style={{ padding: '6px 4px', fontWeight: 700, color: '#15304b', fontSize: 15 }}>Hours</th>
                    <th style={{ padding: '6px 4px', fontWeight: 700, color: '#15304b', fontSize: 15 }}>Title</th>
                    <th style={{ padding: '6px 4px', fontWeight: 700, color: '#15304b', fontSize: 15 }}>Description</th>
                    <th style={{ padding: '6px 4px', fontWeight: 700, color: '#15304b', fontSize: 15 }}>Date</th>
                    <th style={{ padding: '6px 4px', fontWeight: 700, color: '#15304b', fontSize: 15 }}>Location</th>
                    <th style={{ padding: '6px 4px', fontWeight: 700, color: '#15304b', fontSize: 15 }}>Status</th>
                    <th style={{ padding: '6px 4px', fontWeight: 700, color: '#15304b', fontSize: 15 }}>Picture</th>
                  </tr>
                </thead>
                <tbody>
                  {loggedHours.map((log, idx) => (
                    <tr key={log.id || idx} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '6px 4px' }}>{log.hours}</td>
                      <td style={{ padding: '6px 4px' }}>{log.title || log.opportunity_title || log.opportunity_title_db || ''}</td>
                      <td style={{ padding: '6px 4px' }}>{log.description}</td>
                      <td style={{ padding: '6px 4px' }}>{log.date ? new Date(log.date).toLocaleDateString() : ''}</td>
                      <td style={{ padding: '6px 4px' }}>{log.location}</td>
                      <td style={{ padding: '6px 4px' }}>{log.status}</td>
                      <td style={{ padding: '6px 4px' }}>
                        {Array.isArray(log.pictures) && log.pictures.length > 0 && log.pictures.map((pic, i) => (
                          pic ? (
                            <span key={i} style={{ marginRight: 4 }}>
                              <a
                                href={pic.startsWith('http') ? pic : `${import.meta.env.VITE_API_URL}/${pic.replace(/^\//, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-block',
                                  background: '#ffd600',
                                  color: '#15304b',
                                  border: 'none',
                                  borderRadius: 6,
                                  padding: '4px 14px',
                                  fontWeight: 700,
                                  fontSize: 14,
                                  textDecoration: 'none',
                                  boxShadow: '0 1px 4px rgba(49, 130, 206, 0.10)',
                                  cursor: 'pointer',
                                  marginBottom: 2
                                }}
                              >
                                View
                              </a>
                            </span>
                          ) : null
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LogHours; 