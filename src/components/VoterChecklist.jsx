import { useState } from "react";

const checklistData = [
  {
    category: "Before Election Day",
    icon: "📋",
    items: [
      { id: 1, text: "Check your name on the electoral roll at voterportal.eci.gov.in", link: "https://voterportal.eci.gov.in" },
      { id: 2, text: "Find your polling booth using the Voter Helpline App or call 1950" },
      { id: 3, text: "Make sure your Voter ID (EPIC) is valid and not damaged" },
      { id: 4, text: "Know the alternative IDs accepted if you don't have Voter ID" },
      { id: 5, text: "Check the polling date and time for your constituency" },
    ],
  },
  {
    category: "Valid ID Documents to Carry",
    icon: "🪪",
    items: [
      { id: 6, text: "Voter ID Card (EPIC) — most preferred" },
      { id: 7, text: "Aadhaar Card" },
      { id: 8, text: "Passport" },
      { id: 9, text: "Driving License" },
      { id: 10, text: "MNREGA Job Card" },
      { id: 11, text: "Bank/Post Office Passbook with photograph" },
    ],
  },
  {
    category: "On Polling Day",
    icon: "🗳️",
    items: [
      { id: 12, text: "Carry a valid photo ID proof to the polling booth" },
      { id: 13, text: "Reach the polling booth during voting hours (7 AM – 6 PM)" },
      { id: 14, text: "Stand in the queue and wait for your turn patiently" },
      { id: 15, text: "Give your details to the Polling Officer at Table 1" },
      { id: 16, text: "Get your finger marked with indelible ink at Table 2" },
      { id: 17, text: "Collect your ballot slip and proceed to the EVM" },
      { id: 18, text: "Press the button next to your chosen candidate on the EVM" },
      { id: 19, text: "Verify the VVPAT slip that appears for 7 seconds" },
    ],
  },
  {
    category: "Your Voter Rights",
    icon: "⚖️",
    items: [
      { id: 20, text: "You have the right to vote without any pressure or influence" },
      { id: 21, text: "You can use NOTA if you disapprove of all candidates" },
      { id: 22, text: "You can complain about MCC violations to ECI via 1950" },
      { id: 23, text: "If you're in queue before 6 PM, you MUST be allowed to vote" },
      { id: 24, text: "Report vote buying or booth capturing immediately to authorities" },
    ],
  },
];

const VoterChecklist = () => {
  const [checked, setChecked] = useState({});
  const [collapsed, setCollapsed] = useState({});

  const toggle = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCategory = (cat) => {
    setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const totalItems = checklistData.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((checkedCount / totalItems) * 100);

  const getProgressColor = () => {
    if (progress >= 80) return "#0f6e56";
    if (progress >= 50) return "#185fa5";
    return "#e74c3c";
  };

  const handleReset = () => setChecked({});

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>✅ Voter Checklist</h2>
      <p style={styles.sub}>
        Everything you need to do before and on election day. Check off each item!
      </p>

      <div style={styles.progressCard}>
        <div style={styles.progressTop}>
          <span style={styles.progressLabel}>Your Readiness</span>
          <span style={{ ...styles.progressPct, color: getProgressColor() }}>
            {progress}%
          </span>
        </div>
        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${progress}%`,
              background: getProgressColor(),
            }}
          />
        </div>
        <div style={styles.progressSub}>
          {checkedCount} of {totalItems} items completed
          {progress === 100 && " 🎉 You're ready to vote!"}
        </div>
        {checkedCount > 0 && (
          <button style={styles.resetBtn} onClick={handleReset}>
            Reset
          </button>
        )}
      </div>

      {checklistData.map((category) => {
        const catChecked = category.items.filter((i) => checked[i.id]).length;
        const isCollapsed = collapsed[category.category];

        return (
          <div key={category.category} style={styles.section}>
            <div
              style={styles.sectionHeader}
              onClick={() => toggleCategory(category.category)}
            >
              <div style={styles.sectionLeft}>
                <span style={styles.sectionIcon}>{category.icon}</span>
                <span style={styles.sectionTitle}>{category.category}</span>
                <span style={styles.sectionCount}>
                  {catChecked}/{category.items.length}
                </span>
              </div>
              <span style={styles.collapseIcon}>
                {isCollapsed ? "▼" : "▲"}
              </span>
            </div>

            {!isCollapsed && (
              <div style={styles.itemList}>
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      ...styles.item,
                      background: checked[item.id] ? "#e1f5ee" : "white",
                      borderColor: checked[item.id] ? "#0f6e56" : "#e8e4df",
                    }}
                    onClick={() => toggle(item.id)}
                  >
                    <div
                      style={{
                        ...styles.checkbox,
                        background: checked[item.id] ? "#0f6e56" : "white",
                        borderColor: checked[item.id] ? "#0f6e56" : "#ccc",
                      }}
                    >
                      {checked[item.id] && <span style={styles.checkmark}>✓</span>}
                    </div>
                    <span
                      style={{
                        ...styles.itemText,
                        textDecoration: checked[item.id] ? "line-through" : "none",
                        color: checked[item.id] ? "#0f6e56" : "#1a1a2e",
                      }}
                    >
                      {item.text}
                    </span>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.link}
                        onClick={(e) => e.stopPropagation()}
                      >
                        🔗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  container: { maxWidth: "780px", margin: "0 auto", padding: "2.5rem 1rem" },
  title: { fontFamily: "Georgia, serif", fontSize: "1.8rem", fontWeight: "700", marginBottom: "0.4rem" },
  sub: { color: "#4a4a6a", fontSize: "0.95rem", marginBottom: "2rem" },
  progressCard: {
    background: "white", borderRadius: "14px",
    padding: "1.5rem", border: "1px solid #e8e4df",
    marginBottom: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  progressTop: { display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" },
  progressLabel: { fontWeight: "600", fontSize: "0.95rem" },
  progressPct: { fontWeight: "700", fontSize: "1.1rem" },
  progressBar: { height: "8px", background: "#e8e4df", borderRadius: "4px", overflow: "hidden", marginBottom: "0.6rem" },
  progressFill: { height: "100%", borderRadius: "4px", transition: "width 0.4s ease, background 0.3s" },
  progressSub: { fontSize: "0.82rem", color: "#4a4a6a" },
  resetBtn: {
    marginTop: "0.8rem", padding: "5px 14px",
    background: "transparent", border: "1px solid #e8e4df",
    borderRadius: "6px", cursor: "pointer",
    fontSize: "0.78rem", color: "#4a4a6a", fontFamily: "inherit",
  },
  section: { marginBottom: "1.2rem" },
  sectionHeader: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", padding: "0.9rem 1.2rem",
    background: "#1a1a2e", borderRadius: "10px",
    cursor: "pointer", marginBottom: "0.5rem",
  },
  sectionLeft: { display: "flex", alignItems: "center", gap: "10px" },
  sectionIcon: { fontSize: "1.1rem" },
  sectionTitle: { color: "white", fontWeight: "600", fontSize: "0.95rem" },
  sectionCount: {
    background: "rgba(255,255,255,0.15)", color: "white",
    fontSize: "0.75rem", padding: "2px 8px", borderRadius: "12px",
  },
  collapseIcon: { color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" },
  itemList: { display: "flex", flexDirection: "column", gap: "8px" },
  item: {
    display: "flex", alignItems: "center", gap: "12px",
    padding: "0.85rem 1.2rem", borderRadius: "10px",
    border: "1.5px solid", cursor: "pointer",
    transition: "all 0.2s",
  },
  checkbox: {
    width: "22px", height: "22px", borderRadius: "6px",
    border: "2px solid", display: "flex",
    alignItems: "center", justifyContent: "center", flexShrink: 0,
    transition: "all 0.2s",
  },
  checkmark: { color: "white", fontSize: "0.8rem", fontWeight: "700" },
  itemText: { fontSize: "0.9rem", lineHeight: "1.5", flex: 1, transition: "all 0.2s" },
  link: { fontSize: "1rem", textDecoration: "none", flexShrink: 0 },
};

export default VoterChecklist;