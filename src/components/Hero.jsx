const Hero = ({ setActivePage }) => {
  const stats = [
    { num: "968M+", label: "Registered Voters" },
    { num: "543", label: "Lok Sabha Seats" },
    { num: "10+", label: "Quiz Questions" },
    { num: "100%", label: "Free & Open" },
  ];

  return (
    <div style={styles.hero}>
      <div style={styles.badge}>🇮🇳 India's Election Education Platform</div>
      <h1 style={styles.h1}>
        Understand Elections,{" "}
        <span style={styles.accent}>Vote with Confidence</span>
      </h1>
      <p style={styles.subtitle}>
        Your AI-powered guide to understanding the Indian election process —
        from voter registration to result declaration. Interactive, simple, and free.
      </p>

      <div style={styles.btnRow}>
        <button style={styles.btnPrimary} onClick={() => setActivePage("chat")}>
          🤖 Ask AI Assistant
        </button>
        <button style={styles.btnSecondary} onClick={() => setActivePage("quiz")}>
          🧠 Take the Quiz
        </button>
      </div>

      <div style={styles.statsRow}>
        {stats.map((s, i) => (
          <div key={i} style={styles.stat}>
            <div style={styles.statNum}>{s.num}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  hero: {
    background: "linear-gradient(135deg, #1a1a2e 0%, #2c2c54 60%, #1a1a2e 100%)",
    padding: "5rem 2rem 4rem",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    background: "rgba(192,57,43,0.2)",
    border: "1px solid rgba(192,57,43,0.4)",
    color: "#e88",
    fontSize: "0.78rem",
    padding: "5px 16px",
    borderRadius: "20px",
    marginBottom: "1.5rem",
    letterSpacing: "1px",
  },
  h1: {
    fontFamily: "Georgia, serif",
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    color: "white",
    fontWeight: "900",
    lineHeight: "1.2",
    marginBottom: "1rem",
  },
  accent: { color: "#e74c3c" },
  subtitle: {
    color: "rgba(255,255,255,0.65)",
    fontSize: "1.05rem",
    maxWidth: "580px",
    margin: "0 auto 2.5rem",
    lineHeight: "1.7",
  },
  btnRow: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "3rem",
  },
  btnPrimary: {
    padding: "0.85rem 2rem",
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
  },
  btnSecondary: {
    padding: "0.85rem 2rem",
    background: "transparent",
    color: "white",
    border: "2px solid rgba(255,255,255,0.3)",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
  },
  statsRow: {
    display: "flex",
    gap: "2.5rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  stat: { textAlign: "center" },
  statNum: {
    fontFamily: "Georgia, serif",
    fontSize: "1.8rem",
    color: "#d4a017",
    fontWeight: "700",
  },
  statLabel: {
    fontSize: "0.75rem",
    color: "rgba(255,255,255,0.5)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
};

export default Hero;