const StatusBadge = ({ status }) => {
  const colors = {
    HIGH: "var(--danger)",
    MEDIUM: "var(--warning)",
    LOW: "var(--success)",
    ACTIVE: "var(--accent)",
    IN_PROGRESS: "#ffd166",
    RESOLVED: "#6ddc8a",
  };

  const textColor = status === "ACTIVE" ? "#fff" : "#000";

  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: "6px",
        fontSize: "12px",
        background: colors[status] || "var(--border)",
        color: textColor,
        fontWeight: "bold",
      }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
