import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const statCardStyle = {
  flex: 1,
  minWidth: 220,
  margin: "0 1rem",
  background: "#f7f8fa",
  borderRadius: 14,
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  padding: "2rem 1.5rem 1.5rem 1.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const statNumberStyle = {
  fontSize: 38,
  fontWeight: 700,
  color: "#15304b",
  marginBottom: 8,
};

const statLabelStyle = {
  fontSize: 18,
  color: "#888",
  fontWeight: 500,
  textAlign: "center",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applications, setApplications] = useState([]);
  const [appLoading, setAppLoading] = useState(true);
  const [appError, setAppError] = useState("");
  const [opportunities, setOpportunities] = useState([]);
  const [oppLoading, setOppLoading] = useState(true);
  const [oppError, setOppError] = useState("");
  // Add state for action loading and error
  const [actionLoading, setActionLoading] = useState({});
  const [actionError, setActionError] = useState({});
  // Add state for delete loading and error
  const [deleteLoading, setDeleteLoading] = useState({});
  const [deleteError, setDeleteError] = useState({});
  const [deleteSuccess, setDeleteSuccess] = useState("");
  // State for editing opportunity
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editOpportunity, setEditOpportunity] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");

  const openEditModal = (opp) => {
    setEditOpportunity(opp);
    setEditForm({
      opportunityId: opp.id,
      title: opp.title,
      type: opp.type,
      description: opp.description,
      location: opp.location,
      start_date: opp.start_date?.slice(0, 10) || "",
      end_date: opp.end_date?.slice(0, 10) || "",
      commitment_type: opp.commitment_type,
      contact_email: opp.contact_email,
    });
    setEditError("");
    setEditSuccess("");
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditOpportunity(null);
    setEditForm({});
    setEditError("");
    setEditSuccess("");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    setEditSuccess("");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/opportunities`,
        editForm,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setOpportunities((prev) =>
        prev.map((opp) =>
          opp.id === editForm.opportunityId
            ? { ...opp, ...editForm }
            : opp
        )
      );
      setEditSuccess("Opportunity updated successfully.");
      setTimeout(() => {
        setEditSuccess("");
        closeEditModal();
      }, 1200);
    } catch (err) {
      setEditError(err.response?.data?.message || "Failed to update opportunity");
    } finally {
      setEditLoading(false);
    }
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "organization") {
      navigate("/");
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/organizations/dashboard`;
        const res = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message || "Error loading dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchApplications = async () => {
      setAppLoading(true);
      setAppError("");
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/applications`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {},
          }
        );
        setApplications(res.data);
      } catch (err) {
        setAppError(err.response?.data?.message || "Failed to fetch applications");
      } finally {
        setAppLoading(false);
      }
    };
    fetchApplications();
  }, []);

  useEffect(() => {
    const fetchOpportunities = async () => {
      setOppLoading(true);
      setOppError("");
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/opportunities`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOpportunities(res.data.opportunities || []);
      } catch (err) {
        setOppError(err.response?.data?.message || "Failed to fetch opportunities");
      } finally {
        setOppLoading(false);
      }
    };
    fetchOpportunities();
  }, []);

  // Map opportunityId to applicants
  const applicantsByOpp = {};
  applications.forEach(app => {
    if (!applicantsByOpp[app.opportunity_id]) applicantsByOpp[app.opportunity_id] = [];
    applicantsByOpp[app.opportunity_id].push(app);
  });

  // Group applications by opportunity and status
  const jobsMap = {};
  applications.forEach(app => {
    if (!jobsMap[app.opportunity_id]) {
      jobsMap[app.opportunity_id] = {
        title: app.opportunity_title,
        applicants: [],
      };
    }
    jobsMap[app.opportunity_id].applicants.push(app);
  });
  const jobs = Object.entries(jobsMap);

  // After fetching dashboard data, get the org_id
  const orgId = data?.organization_id;

  const chartData = data
    ? {
        labels: ["Opportunities", "Applications", "Accepted"],
        datasets: [
          {
            label: "Count",
            data: [
              data.total_opportunities,
              data.total_applications,
              data.accepted_applications,
            ],
            backgroundColor: [
              "#ffd600",
              "#3cb4e7",
              "#4BB543",
            ],
            borderRadius: 8,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Organization Dashboard",
        font: { size: 26, weight: "bold" },
        color: "#15304b",
        padding: { top: 10, bottom: 30 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  // Handler for accept/reject
  const handleStatusChange = async (applicationId, status) => {
    setActionLoading((prev) => ({ ...prev, [applicationId]: true }));
    setActionError((prev) => ({ ...prev, [applicationId]: null }));
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/applications/status`,
        { applicationId, status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // Update the status in the UI without reload
      setApplications((prev) =>
        prev.map((app) =>
          app.application_id === applicationId ? { ...app, status } : app
        )
      );
    } catch (err) {
      setActionError((prev) => ({
        ...prev,
        [applicationId]: err.response?.data?.message || "Failed to update status",
      }));
    } finally {
      setActionLoading((prev) => ({ ...prev, [applicationId]: false }));
    }
  };

  // Handler for deleting an opportunity
  const handleDeleteOpportunity = async (opportunityId) => {
    if (!window.confirm("Are you sure you want to delete this opportunity? This action cannot be undone.")) return;
    setDeleteLoading((prev) => ({ ...prev, [opportunityId]: true }));
    setDeleteError((prev) => ({ ...prev, [opportunityId]: null }));
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/opportunities`,
        { opportunityId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setOpportunities((prev) => prev.filter((opp) => opp.id !== opportunityId));
      setDeleteSuccess("Opportunity deleted successfully.");
      setTimeout(() => setDeleteSuccess(""), 2000);
    } catch (err) {
      setDeleteError((prev) => ({
        ...prev,
        [opportunityId]: err.response?.data?.message || "Failed to delete opportunity",
      }));
    } finally {
      setDeleteLoading((prev) => ({ ...prev, [opportunityId]: false }));
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, background: "linear-gradient(120deg, #f7faff 0%, #e9f7ff 100%)", padding: "2rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: 32, background: "#fff", borderRadius: 18, boxShadow: "0 6px 32px rgba(0,0,0,0.10)", minHeight: 600 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#15304b", marginBottom: 8, letterSpacing: 1 }}>Dashboard</h1>
          <div style={{ color: "#888", fontSize: 18, marginBottom: 32 }}>
            Welcome to your organization analytics overview.
          </div>
          {loading && <div style={{ fontSize: 20, color: "#888" }}>Loading...</div>}
          {error && <div style={{ color: "#D7263D", fontSize: 18 }}>{error}</div>}
          {data && (
            <>
              <Bar data={chartData} options={chartOptions} />
              <div style={{ borderTop: "1px solid #e2e8f0", margin: "2.5rem 0 2rem 0" }} />
              <div style={{ display: "flex", flexWrap: "wrap", jurstifyContent: "space-between", gap: 24 }}>
                <div style={statCardStyle}>
                  <div style={statNumberStyle}>{data.total_opportunities}</div>
                  <div style={statLabelStyle}>Total Opportunities</div>
                </div>
                <div style={statCardStyle}>
                  <div style={statNumberStyle}>{data.total_applications}</div>
                  <div style={statLabelStyle}>Total Applications</div>
                </div>
                <div style={statCardStyle}>
                  <div style={statNumberStyle}>{data.accepted_applications}</div>
                  <div style={statLabelStyle}>Accepted Applications</div>
                </div>
              </div>
              {/* New: Jobs and Applicants Section */}
              <div style={{ marginTop: 48 }}>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: "#15304b", marginBottom: 18 }}>Your Posted Opportunities & Applicants</h2>
                {oppLoading && <div>Loading opportunities...</div>}
                {oppError && <div style={{ color: "#D7263D" }}>{oppError}</div>}
                {deleteSuccess && <div style={{ color: '#4BB543', fontWeight: 600, marginBottom: 16 }}>{deleteSuccess}</div>}
                {!oppLoading && opportunities.length === 0 && <div>No opportunities posted yet.</div>}
                {opportunities.filter(opp => String(opp.org_id) === String(orgId)).map((opp) => {
                  const job = {
                    title: opp.title,
                    id: opp.id,
                    applicants: applicantsByOpp[opp.id] || [],
                  };
                  return (
                    <div key={job.id} style={{ marginBottom: 36, padding: 24, border: "1px solid #e2e8f0", borderRadius: 12, background: "#f9fafb" }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 600, color: "#222", marginBottom: 0 }}>Opportunity Title: {job.title}</h3>
                        <div style={{ display: 'flex', gap: 10 }}>
                          <button
                            onClick={() => openEditModal(opp)}
                            style={{
                              background: '#fff',
                              color: '#3cb4e7',
                              border: '1.5px solid #3cb4e7',
                              borderRadius: 6,
                              padding: '6px 16px',
                              fontWeight: 700,
                              fontSize: 15,
                              cursor: 'pointer',
                              transition: 'background 0.2s, color 0.2s',
                            }}
                          >
                            Modify
                          </button>
                          <button
                            onClick={() => handleDeleteOpportunity(job.id)}
                            disabled={deleteLoading[job.id]}
                            style={{
                              background: '#fff',
                              color: '#D7263D',
                              border: '1.5px solid #D7263D',
                              borderRadius: 6,
                              padding: '6px 16px',
                              fontWeight: 700,
                              fontSize: 15,
                              cursor: deleteLoading[job.id] ? 'not-allowed' : 'pointer',
                              transition: 'background 0.2s, color 0.2s',
                            }}
                          >
                            {deleteLoading[job.id] ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                      {deleteError[job.id] && <div style={{ color: '#D7263D', marginBottom: 8 }}>{deleteError[job.id]}</div>}
                      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                        {/* Pending Applicants */}
                        <div style={{ flex: 1, minWidth: 260 }}>
                          <div style={{ fontWeight: 600, color: "#888", marginBottom: 6 }}>Pending Applicants</div>
                          {job.applicants.filter(a => a.status === "pending").length === 0 ? (
                            <div style={{ color: "#bbb" }}>No pending applicants.</div>
                          ) : (
                            job.applicants.filter(a => a.status === "pending").map(app => (
                              <div key={app.application_id} style={{ background: "#fff", borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: 12, marginBottom: 10 }}>
                                <div><span style={{ fontWeight: 600 }}>Applicant Name:</span> {app.full_name}</div>
                                <div><span style={{ fontWeight: 600 }}>Email:</span> {app.email}</div>
                                <div><span style={{ fontWeight: 600 }}>Phone:</span> {app.phone}</div>
                                <div><span style={{ fontWeight: 600 }}>Reason:</span> {app.reason}</div>
                                <div><span style={{ fontWeight: 600 }}>Applied At:</span> {new Date(app.applied_at).toLocaleString()}</div>
                                {app.resume_url && (
                                  <div style={{ marginTop: 6 }}>
                                    <a
                                      href={app.resume_url.startsWith('http') ? app.resume_url : `${import.meta.env.VITE_API_URL}/${app.resume_url}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{ color: '#3cb4e7', fontWeight: 600, textDecoration: 'underline' }}
                                    >
                                      View Resume
                                    </a>
                                  </div>
                                )}
                                <div style={{ marginTop: 8, display: 'flex', gap: 12 }}>
                                  <button
                                    style={{ background: '#4BB543', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}
                                    disabled={actionLoading[app.application_id]}
                                    onClick={() => handleStatusChange(app.application_id, 'accepted')}
                                  >
                                    {actionLoading[app.application_id] ? 'Accepting...' : 'Accept'}
                                  </button>
                                  <button
                                    style={{ background: '#D7263D', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}
                                    disabled={actionLoading[app.application_id]}
                                    onClick={() => handleStatusChange(app.application_id, 'rejected')}
                                  >
                                    {actionLoading[app.application_id] ? 'Rejecting...' : 'Reject'}
                                  </button>
                                </div>
                                {actionError[app.application_id] && <div style={{ color: '#D7263D', marginTop: 4 }}>{actionError[app.application_id]}</div>}
                              </div>
                            ))
                          )}
                        </div>
                        {/* Accepted Applicants */}
                        <div style={{ flex: 1, minWidth: 260 }}>
                          <div style={{ fontWeight: 600, color: "#4BB543", marginBottom: 6 }}>Accepted Applicants</div>
                          {job.applicants.filter(a => a.status === "accepted").length === 0 ? (
                            <div style={{ color: "#bbb" }}>No accepted applicants.</div>
                          ) : (
                            job.applicants.filter(a => a.status === "accepted").map(app => (
                              <div key={app.application_id} style={{ background: "#fff", borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: 12, marginBottom: 10 }}>
                                <div><span style={{ fontWeight: 600 }}>Applicant Name:</span> {app.full_name}</div>
                                <div><span style={{ fontWeight: 600 }}>Email:</span> {app.email}</div>
                                <div><span style={{ fontWeight: 600 }}>Phone:</span> {app.phone}</div>
                                <div><span style={{ fontWeight: 600 }}>Reason:</span> {app.reason}</div>
                                <div><span style={{ fontWeight: 600 }}>Applied At:</span> {new Date(app.applied_at).toLocaleString()}</div>
                                {app.resume_url && (
                                  <div style={{ marginTop: 6 }}>
                                    <a
                                      href={app.resume_url.startsWith('http') ? app.resume_url : `${import.meta.env.VITE_API_URL}/${app.resume_url}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{ color: '#3cb4e7', fontWeight: 600, textDecoration: 'underline' }}
                                    >
                                      View Resume
                                    </a>
                                  </div>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
      {/* Edit Opportunity Modal */}
      {editModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.18)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: 32, minWidth: 340, maxWidth: 420, boxShadow: '0 4px 24px rgba(0,0,0,0.13)' }}>
            <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Modify Opportunity</h2>
            <form onSubmit={handleEditSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: 600, color: '#15304b', marginBottom: 4, display: 'block' }}>Title</label>
                <input type="text" name="title" value={editForm.title || ''} onChange={handleEditChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #e2e8f0', fontSize: 15 }} required />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: 600, color: '#15304b', marginBottom: 4, display: 'block' }}>Type</label>
                <input type="text" name="type" value={editForm.type || ''} onChange={handleEditChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #e2e8f0', fontSize: 15 }} required />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: 600, color: '#15304b', marginBottom: 4, display: 'block' }}>Description</label>
                <textarea name="description" value={editForm.description || ''} onChange={handleEditChange} rows={4} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #e2e8f0', fontSize: 15, resize: 'vertical' }} required />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: 600, color: '#15304b', marginBottom: 4, display: 'block' }}>Location</label>
                <input type="text" name="location" value={editForm.location || ''} onChange={handleEditChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #e2e8f0', fontSize: 15 }} required />
              </div>
              <div style={{ marginBottom: 14, display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, color: '#15304b', marginBottom: 4, display: 'block' }}>Start Date</label>
                  <input type="date" name="start_date" value={editForm.start_date || ''} onChange={handleEditChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #e2e8f0', fontSize: 15 }} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, color: '#15304b', marginBottom: 4, display: 'block' }}>End Date</label>
                  <input type="date" name="end_date" value={editForm.end_date || ''} onChange={handleEditChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #e2e8f0', fontSize: 15 }} required />
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: 600, color: '#15304b', marginBottom: 4, display: 'block' }}>Commitment Type</label>
                <select name="commitment_type" value={editForm.commitment_type || ''} onChange={handleEditChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #e2e8f0', fontSize: 15 }} required>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: 600, color: '#15304b', marginBottom: 4, display: 'block' }}>Contact Email</label>
                <input type="email" name="contact_email" value={editForm.contact_email || ''} onChange={handleEditChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #e2e8f0', fontSize: 15 }} required />
              </div>
              {editError && <div style={{ color: '#D7263D', marginBottom: 8 }}>{editError}</div>}
              {editSuccess && <div style={{ color: '#4BB543', marginBottom: 8 }}>{editSuccess}</div>}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button type="button" onClick={closeEditModal} style={{ background: '#e7eaeb', color: '#15304b', border: 'none', borderRadius: 6, padding: '8px 22px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={editLoading} style={{ background: '#ffd600', color: '#15304b', border: 'none', borderRadius: 6, padding: '8px 22px', fontWeight: 700, fontSize: 15, cursor: editLoading ? 'not-allowed' : 'pointer' }}>{editLoading ? 'Saving...' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 