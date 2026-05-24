import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

// এখানে সরাসরি কী-টি কনফিগার করুন
const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

export const chatWithAI = async (req, res) => {
  const { message } = req.body;
  try {
    // মডেল নামটি সরাসরি 'models/gemini-1.5-flash' হিসেবে দিন
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);
    const response = await result.response;
    res.json({ reply: response.text() });
  } catch (error) {
    console.error("Gemini Final Fix Error:", error);
    res.status(500).json({ error: "AI Service error: Check your API Key or Model access." });
  }
};