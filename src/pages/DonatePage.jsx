import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const DonatePage = () => {
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!amount || isNaN(amount) || Number(amount) < 1) {
      setError("Please enter a valid donation amount.");
      return;
    }
    if (!donorName.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!donorEmail.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(donorEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          donor_name: donorName,
          donor_email: donorEmail,
        }),
      });
      if (!res.ok) throw new Error("Failed to create Stripe session");
      const data = await res.json();
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      setError(err.message || "Failed to start donation process");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, background: "linear-gradient(120deg, #f7faff 0%, #e9f7ff 100%)", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 0' }}>
        <div style={{ maxWidth: 440, width: '100%', background: '#fff', borderRadius: 18, boxShadow: '0 6px 32px rgba(0,0,0,0.10)', padding: '2.5rem 2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#15304b', marginBottom: 16 }}>Donate to Q-Volve</h1>
          <div style={{ fontSize: 18, color: '#555', marginBottom: 24, lineHeight: 1.6 }}>
            Your donation helps us connect more volunteers with organizations and make a bigger impact. Thank you for your support!
          </div>
          <form onSubmit={handleSubmit} style={{ width: '100%', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 600, color: '#15304b', marginBottom: 4, display: 'block' }}>Donation Amount (USD)</label>
              <input
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 16 }}
                placeholder="Enter amount"
                required
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 600, color: '#15304b', marginBottom: 4, display: 'block' }}>Your Name</label>
              <input
                type="text"
                value={donorName}
                onChange={e => setDonorName(e.target.value)}
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 16 }}
                placeholder="Enter your name"
                required
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 600, color: '#15304b', marginBottom: 4, display: 'block' }}>Email</label>
              <input
                type="email"
                value={donorEmail}
                onChange={e => setDonorEmail(e.target.value)}
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 16 }}
                placeholder="Enter your email"
                required
              />
            </div>
            {error && <div style={{ color: '#D7263D', marginBottom: 10 }}>{error}</div>}
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? '#e7eaeb' : 'linear-gradient(90deg, #ffd600 0%, #ffe066 100%)',
                color: '#15304b',
                fontWeight: 700,
                border: 'none',
                borderRadius: 8,
                padding: '1rem 2.5rem',
                fontSize: '1.15rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 8px rgba(255, 214, 0, 0.10)',
                marginTop: 8,
                transition: 'background 0.2s, box-shadow 0.2s',
                width: '100%'
              }}
            >
              {loading ? 'Processing...' : 'Donate Now'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DonatePage; 