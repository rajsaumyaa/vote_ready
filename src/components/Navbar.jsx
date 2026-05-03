import { useState } from "react";

const Navbar = ({ activePage, setActivePage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "timeline", label: "Timeline", icon: "📅" },
    { id: "chat", label: "AI Chat", icon: "🤖" },
    { id: "quiz", label: "Quiz", icon: "🧠" },
    { id: "myths", label: "Myth Buster", icon: "💡" },
    { id: "checklist", label: "Voter Checklist", icon: "✅" },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <span style={styles.logo}>🗳️</span>
        <span style={styles.brandName}>VoteWise</span>
      </div>

      <div style={styles.desktopMenu}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            style={{
              ...styles.navBtn,
              ...(activePage === item.id ? styles.navBtnActive : {}),
            }}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </button>

      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActivePage(item.id); setMenuOpen(false); }}
              style={{
                ...styles.mobileBtn,
                ...(activePage === item.id ? styles.mobileBtnActive : {}),
              }}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    position: "sticky", top: 0, zIndex: 100,
    background: "#1a1a2e",
    display: "flex", alignItems: "center",
    padding: "0 1.5rem", height: "60px",
    boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
    flexWrap: "wrap",
  },
  brand: { display: "flex", alignItems: "center", gap: "10px", marginRight: "2rem" },
  logo: { fontSize: "1.5rem" },
  brandName: { fontFamily: "Georgia, serif", fontSize: "1.2rem", color: "white", fontWeight: "700" },
  desktopMenu: { display: "flex", gap: "4px", flex: 1, flexWrap: "wrap",
    "@media (max-width: 768px)": { display: "none" }
  },
  navBtn: {
    padding: "6px 12px", background: "transparent",
    border: "none", color: "rgba(255,255,255,0.6)",
    cursor: "pointer", borderRadius: "6px",
    fontSize: "0.82rem", fontWeight: "500",
    transition: "all 0.2s",
  },
  navBtnActive: { color: "#e74c3c", background: "rgba(231,76,60,0.1)" },
  hamburger: {
    display: "none", background: "transparent",
    border: "none", color: "white", fontSize: "1.3rem",
    cursor: "pointer", marginLeft: "auto",
  },
  mobileMenu: {
    position: "absolute", top: "60px", left: 0, right: 0,
    background: "#1a1a2e", display: "flex", flexDirection: "column",
    padding: "1rem", gap: "8px", boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },
  mobileBtn: {
    padding: "10px 16px", background: "transparent",
    border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)",
    cursor: "pointer", borderRadius: "8px", fontSize: "0.9rem", textAlign: "left",
  },
  mobileBtnActive: { color: "#e74c3c", borderColor: "#e74c3c", background: "rgba(231,76,60,0.1)" },
};

export default Navbar;