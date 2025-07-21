import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const cardStyle = {
  maxWidth: 600,
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

const labelStyle = {
  fontWeight: 600,
  color: "#888",
  minWidth: 160,
  marginRight: 12,
  textAlign: "right",
};

const valueStyle = {
  color: "#15304b",
  fontWeight: 500,
  fontSize: 18,
  wordBreak: "break-word",
};

const rowStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: 18,
  width: "100%",
  maxWidth: 420,
};

const defaultProfilePhoto =
  "https://ui-avatars.com/api/?name=Profile&background=ffd600&color=15304b&size=256";

const ProfileSettings = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(res.data.user);
        setProfilePhoto(res.data.user.profile_photo_url || null);
        setEditForm(res.data.user);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile info");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

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
      // Only send fields that are changed or filled
      const payload = { ...editForm };
      if (!payload.password) delete payload.password;
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/me`,
        payload,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUser(res.data.user || payload);
      setEditSuccess("Profile updated successfully!");
      setTimeout(() => {
        setEditSuccess("");
        setEditMode(false);
      }, 1200);
    } catch (err) {
      setEditError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setEditLoading(false);
    }
  };

  const handlePhotoChange = async (e) => {
    if (!e.target.files || !e.target.files[0]) return;
    setUploading(true);
    setUploadError("");
    setUploadSuccess("");
    const formData = new FormData();
    formData.append("photo", e.target.files[0]);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/profile-photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfilePhoto(res.data.profile_photo_url);
      setUploadSuccess("Profile photo uploaded successfully!");
      setUser((prev) => prev ? { ...prev, profile_photo_url: res.data.profile_photo_url } : prev);
      // Notify other components (like Navbar) to update photo instantly
      window.dispatchEvent(new CustomEvent('profile-photo-updated', { detail: { url: res.data.profile_photo_url } }));
    } catch (err) {
      setUploadError(err.response?.data?.message || "Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, background: "linear-gradient(120deg, #f7faff 0%, #e9f7ff 100%)", padding: "2rem 0" }}>
        <div style={cardStyle}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#15304b", marginBottom: 18 }}>Profile Settings</h1>
          {loading && <div style={{ fontSize: 20, color: "#888" }}>Loading...</div>}
          {error && <div style={{ color: "#D7263D", fontSize: 18 }}>{error}</div>}
          {user && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                <label htmlFor="profile-photo-upload" style={{ cursor: uploading ? 'not-allowed' : 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img
                    src={profilePhoto || user.profile_photo_url || defaultProfilePhoto}
                    alt="Profile"
                    style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", boxShadow: "0 2px 8px rgba(0,0,0,0.10)", border: '4px solid #ffd600', marginBottom: 10, opacity: uploading ? 0.6 : 1, transition: 'opacity 0.2s' }}
                  />
                </label>
                <input
                  id="profile-photo-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handlePhotoChange}
                  disabled={uploading}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('profile-photo-upload').click()}
                  disabled={uploading}
                  style={{
                    background: uploading ? '#e7eaeb' : '#ffd600',
                    color: uploading ? '#888' : '#15304b',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 28px',
                    fontWeight: 700,
                    fontSize: 16,
                    marginTop: 4,
                    marginBottom: 4,
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    boxShadow: uploading ? 'none' : '0 2px 8px rgba(49, 130, 206, 0.10)',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  {uploading ? 'Uploading...' : 'Upload New Photo'}
                </button>
                {uploadError && <div style={{ color: '#D7263D', marginTop: 4 }}>{uploadError}</div>}
                {uploadSuccess && <div style={{ color: '#4BB543', marginTop: 4 }}>{uploadSuccess}</div>}
              </div>
              {!editMode && (
                <div style={{ fontSize: 20, fontWeight: 700, color: "#ffd600", marginBottom: 18 }}>
                  {user.user_type === "organization" ? "Organization" : "Volunteer"}
                </div>
              )}
              {/* Organization fields */}
              {!editMode && user.user_type === "organization" && (
                <div style={{ width: "100%" }}>
                  <div style={rowStyle}><span style={labelStyle}>Organization Name:</span><span style={valueStyle}>{user.org_name}</span></div>
                  <div style={rowStyle}><span style={labelStyle}>Company Type:</span><span style={valueStyle}>{user.company_type}</span></div>
                  <div style={rowStyle}><span style={labelStyle}>Registration #:</span><span style={valueStyle}>{user.registration_number}</span></div>
                  <div style={rowStyle}><span style={labelStyle}>Year Founded:</span><span style={valueStyle}>{user.year_founded}</span></div>
                  <div style={rowStyle}><span style={labelStyle}>Contact Person:</span><span style={valueStyle}>{user.contact_person_name}</span></div>
                  <div style={rowStyle}><span style={labelStyle}>Email:</span><span style={valueStyle}>{user.email}</span></div>
                  <div style={rowStyle}><span style={labelStyle}>Phone:</span><span style={valueStyle}>{user.phone}</span></div>
                  <div style={rowStyle}><span style={labelStyle}>City:</span><span style={valueStyle}>{user.city}</span></div>
                  <div style={rowStyle}><span style={labelStyle}>Country:</span><span style={valueStyle}>{user.country}</span></div>
                  <div style={rowStyle}><span style={labelStyle}>About:</span><span style={valueStyle}>{user.about}</span></div>
                  <div style={rowStyle}><span style={labelStyle}>Username:</span><span style={valueStyle}>{user.username}</span></div>
                </div>
              )}
              {!editMode && user.user_type === "volunteer" && (
                <div style={{ width: "100%" }}>
                  <div style={rowStyle}><span style={labelStyle}>Username:</span><span style={valueStyle}>{user.username}</span></div>
                  <div style={rowStyle}><span style={labelStyle}>First Name:</span><span style={valueStyle}>{user.first_name}</span></div>
                  <div style={rowStyle}><span style={labelStyle}>Last Name:</span><span style={valueStyle}>{user.last_name}</span></div>
                  <div style={rowStyle}><span style={labelStyle}>Email:</span><span style={valueStyle}>{user.email}</span></div>
                  {/* Add more fields as needed */}
                </div>
              )}
              {editMode && (
                <form onSubmit={handleEditSubmit} style={{ width: '100%', maxWidth: 420, margin: '0 auto' }}>
                  {user.user_type === "organization" ? (
                    <>
                      <div style={rowStyle}><span style={labelStyle}>Organization Name:</span><input name="org_name" value={editForm.org_name || ''} onChange={handleEditChange} style={{ ...valueStyle, flex: 1, minWidth: 0 }} required /></div>
                      <div style={rowStyle}><span style={labelStyle}>Company Type:</span><input name="company_type" value={editForm.company_type || ''} onChange={handleEditChange} style={{ ...valueStyle, flex: 1, minWidth: 0 }} required /></div>
                      <div style={rowStyle}><span style={labelStyle}>Registration #:</span><input name="registration_number" value={editForm.registration_number || ''} onChange={handleEditChange} style={{ ...valueStyle, flex: 1, minWidth: 0 }} required /></div>
                      <div style={rowStyle}><span style={labelStyle}>Year Founded:</span><input name="year_founded" value={editForm.year_founded || ''} onChange={handleEditChange} style={{ ...valueStyle, flex: 1, minWidth: 0 }} required /></div>
                      <div style={rowStyle}><span style={labelStyle}>Contact Person:</span><input name="contact_person_name" value={editForm.contact_person_name || ''} onChange={handleEditChange} style={{ ...valueStyle, flex: 1, minWidth: 0 }} required /></div>
                      <div style={rowStyle}><span style={labelStyle}>Email:</span><input name="email" value={editForm.email || ''} onChange={handleEditChange} style={{ ...valueStyle, flex: 1, minWidth: 0 }} required type="email" /></div>
                      <div style={rowStyle}><span style={labelStyle}>Phone:</span><input name="phone" value={editForm.phone || ''} onChange={handleEditChange} style={{ ...valueStyle, flex: 1, minWidth: 0 }} required /></div>
                      <div style={rowStyle}><span style={labelStyle}>City:</span><input name="city" value={editForm.city || ''} onChange={handleEditChange} style={{ ...valueStyle, flex: 1, minWidth: 0 }} required /></div>
                      <div style={rowStyle}><span style={labelStyle}>Country:</span><input name="country" value={editForm.country || ''} onChange={handleEditChange} style={{ ...valueStyle, flex: 1, minWidth: 0 }} required /></div>
                      <div style={rowStyle}><span style={labelStyle}>About:</span><input name="about" value={editForm.about || ''} onChange={handleEditChange} style={{ ...valueStyle, flex: 1, minWidth: 0 }} /></div>
                      <div style={rowStyle}><span style={labelStyle}>Username:</span><input name="username" value={editForm.username || ''} onChange={handleEditChange} style={{ ...valueStyle, flex: 1, minWidth: 0 }} required /></div>
                    </>
                  ) : (
                    <>
                      <div style={rowStyle}><span style={labelStyle}>Username:</span><input name="username" value={editForm.username || ''} onChange={handleEditChange} style={{ ...valueStyle, flex: 1, minWidth: 0 }} required /></div>
                      <div style={rowStyle}><span style={labelStyle}>First Name:</span><input name="first_name" value={editForm.first_name || ''} onChange={handleEditChange} style={{ ...valueStyle, flex: 1, minWidth: 0 }} required /></div>
                      <div style={rowStyle}><span style={labelStyle}>Last Name:</span><input name="last_name" value={editForm.last_name || ''} onChange={handleEditChange} style={{ ...valueStyle, flex: 1, minWidth: 0 }} required /></div>
                      <div style={rowStyle}><span style={labelStyle}>Email:</span><input name="email" value={editForm.email || ''} onChange={handleEditChange} style={{ ...valueStyle, flex: 1, minWidth: 0 }} required type="email" /></div>
                    </>
                  )}
                  <div style={rowStyle}><span style={labelStyle}>Password:</span><input name="password" value={editForm.password || ''} onChange={handleEditChange} style={{ ...valueStyle, flex: 1, minWidth: 0 }} type="password" placeholder="New password (leave blank to keep)" autoComplete="new-password" /></div>
                  {editError && <div style={{ color: '#D7263D', marginBottom: 8 }}>{editError}</div>}
                  {editSuccess && <div style={{ color: '#4BB543', marginBottom: 8 }}>{editSuccess}</div>}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
                    <button type="button" onClick={() => setEditMode(false)} style={{ background: '#e7eaeb', color: '#15304b', border: 'none', borderRadius: 6, padding: '8px 22px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Cancel</button>
                    <button type="submit" disabled={editLoading} style={{ background: '#ffd600', color: '#15304b', border: 'none', borderRadius: 6, padding: '8px 22px', fontWeight: 700, fontSize: 15, cursor: editLoading ? 'not-allowed' : 'pointer' }}>{editLoading ? 'Saving...' : 'Save Changes'}</button>
                  </div>
                </form>
              )}
              {!editMode && (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  style={{
                    background: '#fff',
                    color: '#3cb4e7',
                    border: '1.5px solid #3cb4e7',
                    borderRadius: 8,
                    padding: '8px 28px',
                    fontWeight: 700,
                    fontSize: 16,
                    marginTop: 18,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(49, 130, 206, 0.10)',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  Edit Profile
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileSettings; 