const Header = () => {
  return (
    <div
      style={{
        background: "var(--card)",
        padding: "14px 20px",
        borderRadius: "var(--radius)",
        border: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3>Aegis Dashboard</h3>

      <div style={{ color: "var(--muted)" }}>
        Temp: 78°C | Load: 65% | Network: Stable 🟢
      </div>
    </div>
  );
};

export default Header;