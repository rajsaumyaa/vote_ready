import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const saveQuizScore = async (score, total, userName = "Anonymous") => {
  try {
    await addDoc(collection(db, "quizScores"), {
      userName,
      score,
      total,
      percentage: Math.round((score / total) * 100),
      timestamp: new Date(),
    });
  } catch (e) {
    console.error("Error saving score:", e);
  }
};

export const getTopScores = async () => {
  try {
    const q = query(collection(db, "quizScores"), orderBy("percentage", "desc"), limit(10));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error fetching scores:", e);
    return [];
  }
};

export const saveChatMessage = async (userMsg, botMsg) => {
  try {
    await addDoc(collection(db, "chatLogs"), {
      userMsg,
      botMsg,
      timestamp: new Date(),
    });
  } catch (e) {
    console.error("Error saving chat:", e);
  }
};