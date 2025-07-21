import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Opportunity.module.css";
import OpportunityCard from "./OpportunityCard";

const Opportunity = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/opportunities?page=${page}&limit=${limit}`);
        if (!res.ok) throw new Error("Failed to fetch opportunities");
        const data = await res.json();
        setOpportunities(data.opportunities || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err.message || "Error loading opportunities");
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunities();
  }, [page]);

  return (
    <div className={styles.opportunity_container}>
      <div className={styles.opportunity_header_container}>
        <div className={styles.heading}>Latest Volunteer Opportunities</div>
        <div
          className={styles.see_all}
          onClick={() => navigate("/opportunities")}
          style={{ cursor: "pointer" }}
        >
          See All
        </div>
      </div>
      {loading && <div>Loading opportunities...</div>}
      {error && <div style={{ color: "#D7263D" }}>{error}</div>}
      <div className={styles.opportunity_list}>
        {opportunities.map((op) => (
          <OpportunityCard
            key={op.id}
            id={op.id}
            title={op.title}
            description={op.description}
            photos={op.photos ? op.photos.slice(0, 4) : []}
            date={`Posted: ${new Date(op.start_date).toLocaleDateString()}`}
          />
        ))}
      </div>
      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          style={{
            padding: '8px 16px',
            marginRight: 8,
            borderRadius: 6,
            border: '1.5px solid #e2e8f0',
            background: page === 1 ? '#f7f8fa' : '#fff',
            color: '#15304b',
            fontWeight: 600,
            cursor: page === 1 ? 'not-allowed' : 'pointer',
            minWidth: 40,
          }}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            style={{
              padding: '8px 14px',
              marginRight: 4,
              borderRadius: 6,
              border: idx + 1 === page ? '2px solid #ffd600' : '1.5px solid #e2e8f0',
              background: idx + 1 === page ? '#ffd600' : '#fff',
              color: idx + 1 === page ? '#15304b' : '#15304b',
              fontWeight: idx + 1 === page ? 700 : 600,
              cursor: 'pointer',
              minWidth: 36,
            }}
            disabled={page === idx + 1}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          style={{
            padding: '8px 16px',
            marginLeft: 8,
            borderRadius: 6,
            border: '1.5px solid #e2e8f0',
            background: page === totalPages ? '#f7f8fa' : '#fff',
            color: '#15304b',
            fontWeight: 600,
            cursor: page === totalPages ? 'not-allowed' : 'pointer',
            minWidth: 40,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Opportunity;
