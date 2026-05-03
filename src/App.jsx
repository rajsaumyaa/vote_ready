import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import AIChat from "./components/AIChat";
import Quiz from "./components/Quiz";
import MythBuster from "./components/MythBuster";
import VoterChecklist from "./components/VoterChecklist";
import "./App.css";

const App = () => {
  const [activePage, setActivePage] = useState("home");

  const renderPage = () => {
    switch (activePage) {
      case "timeline": return <Timeline />;
      case "chat": return <AIChat />;
      case "quiz": return <Quiz />;
      case "myths": return <MythBuster />;
      case "checklist": return <VoterChecklist />;
      default: return null;
    }
  };

  return (
    <div style={styles.app}>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      {activePage === "home" && <Hero setActivePage={setActivePage} />}
      <main style={styles.main}>
        {renderPage()}
      </main>
      <footer style={styles.footer}>
        <p>🗳️ VoteWise — Built with React & Google Gemini AI</p>
        <p style={styles.footerSub}>
          Data sourced from Election Commission of India (eci.gov.in)
        </p>
      </footer>
    </div>
  );
};

const styles = {
  app: { minHeight: "100vh", display: "flex", flexDirection: "column", background: "#faf9f6" },
  main: { flex: 1 },
  footer: {
    background: "#1a1a2e", color: "rgba(255,255,255,0.5)",
    textAlign: "center", padding: "2rem 1rem",
    fontSize: "0.85rem", lineHeight: "1.8",
  },
  footerSub: { fontSize: "0.75rem", marginTop: "0.3rem" },
};

export default App;