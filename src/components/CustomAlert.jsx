import React from "react";
import PropTypes from "prop-types";

const alertStyles = {
  base: {
    position: "fixed",
    top: 24,
    right: 24,
    zIndex: 9999,
    minWidth: 280,
    padding: "16px 24px",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    color: "#fff",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  success: { background: "#4BB543" },
  error: { background: "#D7263D" },
  info: { background: "#0074D9" },
};

function CustomAlert({ message, type = "info", onClose }) {
  if (!message) return null;
  return (
    <div style={{ ...alertStyles.base, ...alertStyles[type] }}>
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 18,
          cursor: "pointer",
        }}
        aria-label="Close alert"
      >
        ×
      </button>
    </div>
  );
}

CustomAlert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["success", "error", "info"]),
  onClose: PropTypes.func.isRequired,
};

export default CustomAlert; 