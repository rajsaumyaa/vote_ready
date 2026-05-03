import { useState } from "react";
import { timelineData } from "../data/timelineData";

const Timeline = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggle = (id) => setExpandedId(expandedId === id ? null : id);

  const statusColors = {
    active: "#e74c3c",
    info: "#185fa5",
    done: "#0f6e56",
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🗓️ Election Timeline</h2>
      <p style={styles.sub}>
        Click on any phase to learn more about what happens during that stage.
      </p>

      <div style={styles.timeline}>
        {timelineData.map((item) => (
          <div key={item.id} style={styles.item}>
            <div style={styles.dotCol}>
              <div
                style={{
                  ...styles.dot,
                  background: statusColors[item.status],
                  boxShadow: item.status === "active"
                    ? `0 0 0 6px rgba(231,76,60,0.2)`
                    : "none",
                }}
              >
                {item.icon}
              </div>
              {item.id !== timelineData.length && <div style={styles.line} />}
            </div>

            <div style={styles.cardCol}>
              <div
                style={{
                  ...styles.card,
                  borderColor: expandedId === item.id
                    ? statusColors[item.status]
                    : "#e8e4df",
                }}
                onClick={() => toggle(item.id)}
              >
                <div style={styles.cardHeader}>
                  <div>
                    <div style={{
                      ...styles.phase,
                      color: statusColors[item.status],
                    }}>
                      {item.phase}
                    </div>
                    <div style={styles.cardTitle}>{item.title}</div>
                    <div style={styles.date}>📅 {item.date}</div>
                  </div>
                  <div style={styles.toggle}>
                    {expandedId === item.id ? "▲" : "▼"}
                  </div>
                </div>

                {expandedId === item.id && (
                  <div style={styles.cardBody}>
                    <p style={styles.description}>{item.description}</p>
                    <div style={styles.tags}>
                      {item.tags.map((tag, i) => (
                        <span key={i} style={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "800px", margin: "0 auto", padding: "2.5rem 1rem" },
  title: { fontFamily: "Georgia, serif", fontSize: "1.8rem", fontWeight: "700", marginBottom: "0.4rem" },
  sub: { color: "#4a4a6a", fontSize: "0.95rem", marginBottom: "2.5rem" },
  timeline: { display: "flex", flexDirection: "column", gap: "0" },
  item: { display: "flex", gap: "1rem" },
  dotCol: { display: "flex", flexDirection: "column", alignItems: "center", width: "48px", flexShrink: 0 },
  dot: {
    width: "42px", height: "42px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "1.2rem", flexShrink: 0, zIndex: 1,
  },
  line: { width: "2px", flex: 1, background: "#e8e4df", margin: "4px 0", minHeight: "20px" },
  cardCol: { flex: 1, paddingBottom: "1.2rem" },
  card: {
    background: "white", borderRadius: "12px",
    padding: "1.2rem 1.5rem", border: "1.5px solid #e8e4df",
    cursor: "pointer", transition: "all 0.2s",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  phase: { fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: "600", marginBottom: "0.3rem" },
  cardTitle: { fontWeight: "600", fontSize: "1rem", marginBottom: "0.3rem", color: "#1a1a2e" },
  date: { fontSize: "0.82rem", color: "#4a4a6a" },
  toggle: { fontSize: "0.9rem", color: "#4a4a6a", marginLeft: "1rem" },
  cardBody: { marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #f0ede8" },
  description: { fontSize: "0.9rem", lineHeight: "1.7", color: "#4a4a6a", marginBottom: "0.8rem" },
  tags: { display: "flex", gap: "6px", flexWrap: "wrap" },
  tag: {
    fontSize: "0.72rem", padding: "3px 10px",
    borderRadius: "20px", background: "#e6f1fb",
    color: "#185fa5", fontWeight: "500",
  },
};

export default Timeline;