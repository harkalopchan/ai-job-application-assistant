import OpenAI from "openai";

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in environment variables.");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // optional but recommended
    "X-Title": "AI Job Application Assistant", // optional
  },
});

export const OPENAI_MODEL = process.env.OPENROUTER_MODEL || "gpt-4.1-mini";

