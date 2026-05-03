import { useState, useRef, useEffect } from "react";
import { askGemini } from "../services/gemini";
import { saveChatMessage } from "../services/firebase";

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm VoteWise AI 🗳️ — your election guide. Ask me anything about Indian elections, voter registration, EVM machines, election timelines, or how your vote counts!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const suggestions = [
    "How do I register to vote?",
    "What is EVM and VVPAT?",
    "How are votes counted?",
    "What is Model Code of Conduct?",
    "Difference between Lok Sabha and Rajya Sabha?",
    "What is NOTA?",
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (overrideText) => {
    const userText = (overrideText || input).trim();
    if (!userText || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      // Skip the initial welcome message and only send actual conversation history
      const historyToSend = messages
        .slice(1)
        .filter((m) => m.role === "user" || m.role === "model")
        .map((m) => ({ role: m.role, text: m.text }));

      const reply = await askGemini(userText, historyToSend);

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      await saveChatMessage(userText, reply);
    } catch (err) {
      console.error("sendMessage error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Sorry, something went wrong. Please try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🤖 AI Election Assistant</h2>
      <p style={styles.sub}>
        Powered by Google Gemini — ask anything about Indian elections.
      </p>

      <div style={styles.chatBox}>
        <div style={styles.chatHeader}>
          <div style={styles.avatarWrap}>
            <span style={styles.avatar}>🗳️</span>
          </div>
          <div>
            <div style={styles.botName}>VoteWise AI</div>
            <div style={styles.botSub}>Powered by Google Gemini</div>
          </div>
          <div style={styles.statusWrap}>
            <span style={styles.statusDot} />
            <span style={styles.statusText}>Online</span>
          </div>
        </div>

        <div style={styles.messages}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.msgRow,
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              {msg.role === "assistant" && (
                <div style={styles.msgIcon}>🗳️</div>
              )}
              <div
                style={{
                  ...styles.bubble,
                  ...(msg.role === "user" ? styles.userBubble : styles.botBubble),
                }}
              >
                {msg.text}
              </div>
              {msg.role === "user" && (
                <div style={{ ...styles.msgIcon, background: "#e74c3c" }}>👤</div>
              )}
            </div>
          ))}

          {loading && (
            <div style={styles.msgRow}>
              <div style={styles.msgIcon}>🗳️</div>
              <div style={styles.botBubble}>
                <div style={styles.typing}>
                  <span style={styles.dot} />
                  <span style={{ ...styles.dot, animationDelay: "0.2s" }} />
                  <span style={{ ...styles.dot, animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={styles.suggestions}>
          {suggestions.map((s, i) => (
            <button
              key={i}
              style={styles.chip}
              onClick={() => sendMessage(s)}
              disabled={loading}
            >
              {s}
            </button>
          ))}
        </div>

        <div style={styles.inputRow}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about elections..."
            disabled={loading}
          />
          <button
            style={styles.sendBtn}
            onClick={() => sendMessage()}
            disabled={loading}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "780px", margin: "0 auto", padding: "2.5rem 1rem" },
  title: { fontFamily: "Georgia, serif", fontSize: "1.8rem", fontWeight: "700", marginBottom: "0.4rem" },
  sub: { color: "#4a4a6a", fontSize: "0.95rem", marginBottom: "2rem" },
  chatBox: { background: "white", borderRadius: "16px", border: "1px solid #e8e4df", overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.06)" },
  chatHeader: { background: "#1a1a2e", padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "12px" },
  avatarWrap: { width: "40px", height: "40px", borderRadius: "50%", background: "#e74c3c", display: "flex", alignItems: "center", justifyContent: "center" },
  avatar: { fontSize: "1.2rem" },
  botName: { color: "white", fontWeight: "600", fontSize: "0.95rem" },
  botSub: { color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" },
  statusWrap: { marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" },
  statusDot: { width: "8px", height: "8px", borderRadius: "50%", background: "#2ecc71", display: "inline-block" },
  statusText: { fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" },
  messages: { height: "380px", overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" },
  msgRow: { display: "flex", gap: "8px", alignItems: "flex-end" },
  msgIcon: { width: "30px", height: "30px", borderRadius: "50%", background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", flexShrink: 0 },
  bubble: { maxWidth: "75%", padding: "0.75rem 1rem", borderRadius: "16px", fontSize: "0.88rem", lineHeight: "1.65" },
  botBubble: { background: "#f0ede8", color: "#1a1a2e", borderRadius: "4px 16px 16px 16px" },
  userBubble: { background: "#1a1a2e", color: "white", borderRadius: "16px 4px 16px 16px" },
  typing: { display: "flex", gap: "4px", alignItems: "center", padding: "4px 0" },
  dot: {
    width: "7px", height: "7px", borderRadius: "50%",
    background: "#4a4a6a", display: "inline-block",
    animation: "bounce 1.2s infinite",
  },
  suggestions: { padding: "0 1.5rem 1rem", display: "flex", gap: "8px", flexWrap: "wrap" },
  chip: {
    padding: "5px 12px", border: "1px solid #e8e4df",
    borderRadius: "20px", fontSize: "0.78rem",
    cursor: "pointer", color: "#4a4a6a",
    background: "white", fontFamily: "inherit",
    transition: "all 0.2s",
  },
  inputRow: { display: "flex", gap: "10px", padding: "1rem 1.5rem", borderTop: "1px solid #f0ede8" },
  input: {
    flex: 1, border: "1.5px solid #e8e4df",
    borderRadius: "24px", padding: "0.65rem 1.2rem",
    fontSize: "0.9rem", outline: "none", fontFamily: "inherit",
  },
  sendBtn: {
    width: "42px", height: "42px", borderRadius: "50%",
    background: "#1a1a2e", border: "none",
    cursor: "pointer", fontSize: "1rem", color: "white",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
};

export default AIChat;