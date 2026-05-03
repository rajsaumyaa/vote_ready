# 🗳️ VoteWise — Your AI Guide to Voting in India

> Voting shouldn’t feel confusing. VoteWise makes it simple, clear, and accessible for everyone.

🔗 **Live Demo:** https://vote-ready-k6zd.vercel.app/  
🏆 **Built for:** PromptWars

---

## 📌 Why VoteWise?

Let’s be honest — most people don’t vote because:
- They don’t understand the process  
- They feel overwhelmed by information  
- Or they just don’t know where to start  

VoteWise fixes that.

Instead of long government pages, we give users a **simple, interactive AI assistant** that answers questions, clears myths, and guides them step-by-step.

---

## 🎯 What Makes It Different?

We didn’t just build another informational website.

We built something people will *actually use*.

- 💬 **Chat instead of search**  
  Ask anything about voting like you would ask a friend  

- 🧠 **Learn in small chunks**  
  Quick quizzes and myth-busting instead of boring text  

- ✅ **Action-focused**  
  A checklist that tells you exactly what to do next  

- ⚖️ **Neutral & factual**  
  No political bias — just verified election information  

---

## 🔧 How the Solution Works
 
### Architecture Overview
 
```
User Browser
    │
    ▼
React Frontend (Vite)
    ├── AIChat.jsx      ──► Google Gemini API (gemini-2.5-flash)
    ├── Quiz.jsx        ──► Static quiz data (quizData.js)
    ├── MythBuster.jsx  ──► Static myth data (mythData.js)
    ├── Timeline.jsx    ──► Election timeline data (timelineData.js)
    └── VoterChecklist  ──► Interactive checklist
         │
         ▼
    Firebase Firestore  ──► Chat message persistence
```

---
## 📁 Project Structure
 
```
votewise-election-assistant/
├── src/
│   ├── components/
│   │   ├── AIChat.jsx          # AI chat interface
│   │   ├── Hero.jsx            # Landing page hero section
│   │   ├── MythBuster.jsx      # Election myth debunker
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Quiz.jsx            # Voter knowledge quiz
│   │   ├── Timeline.jsx        # Election timeline
│   │   └── VoterChecklist.jsx  # Step-by-step voter checklist
│   ├── data/
│   │   ├── mythData.js         # Myth vs fact content
│   │   ├── quizData.js         # Quiz questions and answers
│   │   └── timelineData.js     # Election timeline data
│   ├── hooks/
│   │   └── useFirestore.js     # Firebase Firestore hook
│   ├── services/
│   │   ├── firebase.js         # Firebase initialisation
│   │   └── gemini.js           # Gemini API integration
│   ├── App.jsx                 # Root component and routing
│   └── main.jsx                # React entry point
├── .env                        # Environment variables (not committed)
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```
---

## 🔥 Key Features

### 🤖 AI Chat Assistant
- Powered by **Google Gemini (gemini-2.5-flash)**
- Understands natural language questions
- Keeps conversation context
- Gives clear, simple answers

### 📅 Election Timeline
- Visual breakdown of how elections happen
- From announcement → results

### ❓ Interactive Quiz
- Learn by testing yourself
- Instant feedback + score tracking

### 💡 Myth Buster
- Clears common misinformation
- “Myth vs Fact” cards

### ✅ Voter Checklist
- Step-by-step voting guide

---

## 🛠️ Tech Stack

- React (Vite)  
- Google Gemini API  
- Firebase Firestore  
- Vercel  

---

## 🔐 Security

- API keys stored securely in `.env`  
- Firebase rules applied  
- AI restricted to election topics  

---

## ⚡ Performance

- gemini-1.5-flash for speed  
- Optimized responses  
- Efficient rendering  

---

## ♿ Accessibility

- Mobile-friendly  
- Simple language  
- Keyboard navigation  
- High contrast UI  

---

## 🧪 Testing

- Chat edge cases  
- Quiz logic  
- UI interactions  
- Deployment checks  

---

## 🌐 Google Services Integration
 
| Service | How It's Used |
|---|---|
| **Google Gemini API** (`gemini-2.5-flash`) | Powers the AI Chat assistant with natural language understanding scoped to Indian elections |
| **Firebase Firestore** | Persists chat conversations for analytics and future personalisation |
| **Firebase Hosting** (configured) | Available as an alternative deployment target |
| **Google AI Studio** | Used for API key management and quota monitoring |
 
---

## 🚀 Run Locally

```
git clone https://github.com/YOURUSERNAME/votewise-election-assistant.git
cd votewise-election-assistant
npm install
npm run dev
```

---

## 💡 Vision

VoteWise aims to:
- Increase voter participation  
- Reduce misinformation  
- Make democracy accessible  

---

## 🤝 Team

Built with purpose ❤️

---

## 📄 License

MIT License
