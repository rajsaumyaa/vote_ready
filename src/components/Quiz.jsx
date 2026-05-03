import { useState } from "react";
import { quizData } from "../data/quizData";
import { saveQuizScore } from "../services/firebase";

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [userName, setUserName] = useState("");
  const [nameSaved, setNameSaved] = useState(false);
  const [saved, setSaved] = useState(false);

  const question = quizData[current];
  const progress = ((current) / quizData.length) * 100;

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === question.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= quizData.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const handleSaveScore = async () => {
    await saveQuizScore(score, quizData.length, userName || "Anonymous");
    setSaved(true);
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setNameSaved(false);
    setSaved(false);
    setUserName("");
  };

  const getEmoji = () => {
    const pct = (score / quizData.length) * 100;
    if (pct >= 80) return "🏆";
    if (pct >= 60) return "👍";
    if (pct >= 40) return "📚";
    return "💪";
  };

  const getMessage = () => {
    const pct = (score / quizData.length) * 100;
    if (pct >= 80) return "Excellent! You're an election expert!";
    if (pct >= 60) return "Good job! You know your elections well.";
    if (pct >= 40) return "Not bad! A little more reading will help.";
    return "Keep learning! Every vote counts.";
  };

  if (finished) {
    return (
      <div style={styles.container}>
        <div style={styles.resultCard}>
          <div style={styles.emoji}>{getEmoji()}</div>
          <h2 style={styles.resultTitle}>Quiz Complete!</h2>
          <div style={styles.scoreCircle}>
            <span style={styles.scoreBig}>{score}/{quizData.length}</span>
            <span style={styles.scorePct}>
              {Math.round((score / quizData.length) * 100)}%
            </span>
          </div>
          <p style={styles.message}>{getMessage()}</p>

          {!saved && (
            <div style={styles.saveSection}>
              <p style={styles.saveLabel}>Save your score to the leaderboard:</p>
              <input
                style={styles.nameInput}
                placeholder="Enter your name (optional)"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <button style={styles.saveBtn} onClick={handleSaveScore}>
                💾 Save Score
              </button>
            </div>
          )}

          {saved && (
            <p style={styles.savedMsg}>✅ Score saved to leaderboard!</p>
          )}

          <button style={styles.restartBtn} onClick={handleRestart}>
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🧠 Election Quiz</h2>
      <p style={styles.sub}>Test your knowledge of the Indian election process.</p>

      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${progress}%` }} />
      </div>
      <div style={styles.meta}>
        <span>Question {current + 1} of {quizData.length}</span>
        <span>Score: {score}</span>
      </div>

      <div style={styles.card}>
        <div style={styles.category}>{question.category}</div>
        <p style={styles.question}>{question.question}</p>

        <div style={styles.options}>
          {question.options.map((opt, idx) => {
            let bg = "white";
            let border = "#e8e4df";
            let color = "#1a1a2e";

            if (selected !== null) {
              if (idx === question.correct) {
                bg = "#e1f5ee"; border = "#0f6e56"; color = "#0f6e56";
              } else if (idx === selected && idx !== question.correct) {
                bg = "#fcebeb"; border = "#e74c3c"; color = "#a32d2d";
              }
            }

            return (
              <button
                key={idx}
                style={{ ...styles.option, background: bg, borderColor: border, color }}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
              >
                <span style={styles.optLetter}>
                  {["A", "B", "C", "D"][idx]}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div style={{
            ...styles.feedback,
            background: selected === question.correct ? "#e1f5ee" : "#fcebeb",
            borderLeftColor: selected === question.correct ? "#0f6e56" : "#e74c3c",
          }}>
            <strong>{selected === question.correct ? "✅ Correct!" : "❌ Incorrect!"}</strong>
            <p style={styles.explanation}>{question.explanation}</p>
          </div>
        )}

        {selected !== null && (
          <button style={styles.nextBtn} onClick={handleNext}>
            {current + 1 >= quizData.length ? "See Results 🎉" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "680px", margin: "0 auto", padding: "2.5rem 1rem" },
  title: { fontFamily: "Georgia, serif", fontSize: "1.8rem", fontWeight: "700", marginBottom: "0.4rem" },
  sub: { color: "#4a4a6a", fontSize: "0.95rem", marginBottom: "1.5rem" },
  progressBar: { height: "6px", background: "#e8e4df", borderRadius: "3px", marginBottom: "0.8rem", overflow: "hidden" },
  progressFill: { height: "100%", background: "linear-gradient(to right, #0f6e56, #185fa5)", borderRadius: "3px", transition: "width 0.4s ease" },
  meta: { display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#4a4a6a", marginBottom: "1.5rem" },
  card: { background: "white", borderRadius: "16px", padding: "2rem", border: "1px solid #e8e4df", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" },
  category: { fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.8px", color: "#0f6e56", fontWeight: "600", marginBottom: "0.8rem" },
  question: { fontSize: "1.1rem", fontWeight: "600", lineHeight: "1.5", marginBottom: "1.8rem", color: "#1a1a2e" },
  options: { display: "grid", gap: "10px", marginBottom: "1rem" },
  option: {
    padding: "0.85rem 1.2rem", borderRadius: "10px",
    border: "1.5px solid", cursor: "pointer",
    fontSize: "0.92rem", textAlign: "left",
    display: "flex", alignItems: "center", gap: "12px",
    fontFamily: "inherit", transition: "all 0.15s",
  },
  optLetter: {
    width: "26px", height: "26px", borderRadius: "50%",
    background: "#f0ede8", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "0.75rem", fontWeight: "700",
    flexShrink: 0, color: "#1a1a2e",
  },
  feedback: {
    marginTop: "1.2rem", padding: "1rem 1.2rem",
    borderRadius: "10px", borderLeft: "4px solid",
    fontSize: "0.9rem",
  },
  explanation: { marginTop: "0.5rem", lineHeight: "1.6", fontWeight: "400" },
  nextBtn: {
    marginTop: "1.2rem", padding: "0.75rem 2rem",
    background: "#1a1a2e", color: "white",
    border: "none", borderRadius: "10px",
    cursor: "pointer", fontSize: "0.9rem",
    fontWeight: "500", fontFamily: "inherit",
  },
  resultCard: {
    background: "white", borderRadius: "20px",
    padding: "3rem 2rem", textAlign: "center",
    border: "1px solid #e8e4df", boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
  },
  emoji: { fontSize: "3.5rem", marginBottom: "1rem" },
  resultTitle: { fontFamily: "Georgia, serif", fontSize: "1.8rem", marginBottom: "1.5rem" },
  scoreCircle: {
    width: "140px", height: "140px", borderRadius: "50%",
    background: "linear-gradient(135deg, #1a1a2e, #2c2c54)",
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", margin: "0 auto 1.5rem",
  },
  scoreBig: { fontFamily: "Georgia, serif", fontSize: "2rem", color: "white", fontWeight: "700" },
  scorePct: { fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" },
  message: { color: "#4a4a6a", fontSize: "1rem", marginBottom: "2rem" },
  saveSection: { marginBottom: "1.5rem" },
  saveLabel: { fontSize: "0.9rem", color: "#4a4a6a", marginBottom: "0.8rem" },
  nameInput: {
    padding: "0.65rem 1rem", border: "1.5px solid #e8e4df",
    borderRadius: "8px", fontSize: "0.9rem", width: "100%",
    maxWidth: "300px", display: "block", margin: "0 auto 0.8rem",
    fontFamily: "inherit", outline: "none",
  },
  saveBtn: {
    padding: "0.65rem 1.5rem", background: "#0f6e56",
    color: "white", border: "none", borderRadius: "8px",
    cursor: "pointer", fontSize: "0.9rem", fontFamily: "inherit",
  },
  savedMsg: { color: "#0f6e56", fontWeight: "600", marginBottom: "1rem" },
  restartBtn: {
    padding: "0.75rem 2rem", background: "#1a1a2e",
    color: "white", border: "none", borderRadius: "10px",
    cursor: "pointer", fontSize: "0.9rem", fontFamily: "inherit",
  },
};

export default Quiz;