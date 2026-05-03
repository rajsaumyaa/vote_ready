import { useState } from "react";
import { mythData } from "../data/mythData";

const MythBuster = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("all");

  const filtered = mythData.filter((m) => {
    if (filter === "all") return true;
    return m.verdict === filter;
  });

  const toggle = (id) => setExpandedId(expandedId === id ? null : id);

  const verdictConfig = {
    myth: { label: "❌ Myth", bg: "#fcebeb", color: "#a32d2d", border: "#e74c3c" },
    fact: { label: "✅ Fact", bg: "#e1f5ee", color: "#0f6e56", border: "#0f6e56" },
    partial: { label: "⚠️ Partial", bg: "#faeeda", color: "#854f0b", border: "#d4a017" },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💡 Myth Buster</h2>
      <p style={styles.sub}>
        Separate election facts from fiction. Click any card to reveal the truth.
      </p>

      <div style={styles.filters}>
        {["all", "myth", "fact"].map((f) => (
          <button
            key={f}
            style={{
              ...styles.filterBtn,
              ...(filter === f ? styles.filterActive : {}),
            }}
            onClick={() => setFilter(f)}
          >
            {f === "all" && "🔍 All"}
            {f === "myth" && "❌ Myths"}
            {f === "fact" && "✅ Facts"}
          </button>
        ))}
      </div>

      <div style={styles.grid}>
        {filtered.map((item) => {
          const config = verdictConfig[item.verdict];
          const isOpen = expandedId === item.id;

          return (
            <div
              key={item.id}
              style={{
                ...styles.card,
                borderColor: isOpen ? config.border : "#e8e4df",
              }}
              onClick={() => toggle(item.id)}
            >
              <div style={styles.cardTop}>
                <div
                  style={{
                    ...styles.verdictBadge,
                    background: config.bg,
                    color: config.color,
                  }}
                >
                  {config.label}
                </div>
                <div style={styles.toggleIcon}>{isOpen ? "▲" : "▼"}</div>
              </div>

              <p style={styles.claim}>"{item.claim}"</p>

              {isOpen && (
                <div style={styles.reveal}>
                  <div style={styles.divider} />
                  <p style={styles.explanation}>{item.explanation}</p>
                  <p style={styles.source}>📖 Source: {item.source}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "800px", margin: "0 auto", padding: "2.5rem 1rem" },
  title: { fontFamily: "Georgia, serif", fontSize: "1.8rem", fontWeight: "700", marginBottom: "0.4rem" },
  sub: { color: "#4a4a6a", fontSize: "0.95rem", marginBottom: "1.5rem" },
  filters: { display: "flex", gap: "10px", marginBottom: "2rem", flexWrap: "wrap" },
  filterBtn: {
    padding: "8px 20px", borderRadius: "24px",
    border: "1.5px solid #e8e4df", background: "white",
    cursor: "pointer", fontSize: "0.85rem",
    fontFamily: "inherit", color: "#4a4a6a",
    transition: "all 0.2s",
  },
  filterActive: {
    background: "#1a1a2e", color: "white",
    borderColor: "#1a1a2e",
  },
  grid: { display: "flex", flexDirection: "column", gap: "1rem" },
  card: {
    background: "white", borderRadius: "14px",
    padding: "1.3rem 1.5rem", border: "1.5px solid #e8e4df",
    cursor: "pointer", transition: "all 0.2s",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" },
  verdictBadge: {
    padding: "4px 14px", borderRadius: "20px",
    fontSize: "0.78rem", fontWeight: "600",
  },
  toggleIcon: { fontSize: "0.9rem", color: "#4a4a6a" },
  claim: { fontSize: "0.97rem", fontWeight: "600", lineHeight: "1.5", color: "#1a1a2e" },
  reveal: { marginTop: "1rem" },
  divider: { height: "1px", background: "#f0ede8", marginBottom: "1rem" },
  explanation: { fontSize: "0.9rem", lineHeight: "1.7", color: "#4a4a6a", marginBottom: "0.8rem" },
  source: { fontSize: "0.78rem", color: "#185fa5", fontStyle: "italic" },
};

export default MythBuster;