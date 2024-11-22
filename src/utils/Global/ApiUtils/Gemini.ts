/** @format */

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY!
);

export const geminiModel = (modelName?: string) => {
  const defaultModel = Math.random() < 0.5 ? "gemini-1.5-flash-8b" : "gemini-1.5-flash-002";
  
  return genAI.getGenerativeModel({
    model: modelName || defaultModel,
  });
};