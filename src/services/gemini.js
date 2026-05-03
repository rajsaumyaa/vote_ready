import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

console.log("API KEY:", API_KEY);

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const SYSTEM_CONTEXT = `You are VoteWise, a friendly and knowledgeable election assistant. 
You help users understand:
- How elections work (Indian general elections, state elections, local body elections)
- Voter registration process and eligibility
- Election timelines and important dates
- How to find polling booths
- EVM (Electronic Voting Machine) and VVPAT information
- Role of Election Commission of India
- Difference between Lok Sabha and Rajya Sabha elections
- How votes are counted
- Election code of conduct
- Common election myths and facts

Keep answers concise, friendly, and easy to understand. 
Use simple language. If asked something outside elections, politely redirect to election topics.
Always encourage civic participation and voting.`;

export const askGemini = async (userMessage, chatHistory = []) => {
  try {
    console.log("Sending to Gemini:", userMessage);

    const chat = model.startChat({
      history: chatHistory
        .filter((m) => m.role === "model" || m.role === "user")
        .map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        })),
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const fullPrompt =
      chatHistory.length === 0
        ? `${SYSTEM_CONTEXT}\n\nUser: ${userMessage}`
        : userMessage;

    const result = await chat.sendMessage(fullPrompt);
    const text = result.response.text();
    console.log("Gemini response:", text);
    return text;
  } catch (e) {
    console.error("Gemini error details:", e);
    return "Sorry, I'm having trouble connecting right now. Please try again in a moment!";
  }
};