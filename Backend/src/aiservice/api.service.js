import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateBlog(title) {
  const systemPrompt = `You are a professional blog writer who writes only in plain, simple English. Never use markdown symbols of any kind.`;

  const userPrompt = `
Write a short blog post about this title: "${title}"

STRICT RULES:
1. Length: 100 to 110 words. Count your words before finishing.
2. Format: plain text sentences only. No #, *, -, numbered lists, headings, or quotes.
3. Structure: one flowing paragraph. Start with a hook, explain the idea simply, end with a one-sentence takeaway.
4. Tone: friendly, clear, beginner-friendly.
5. Do not repeat the title inside the blog text.

Return ONLY a JSON object in this exact format, with nothing else:
{"content": "the blog text goes here"}
`;

  try {
    const chatCompletion = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ],
  temperature: 0.6,
  max_tokens: 700,
});

    const content = chatCompletion.choices[0].message.content;
    console.log("RAW AI OUTPUT:", content);

    const parsed = JSON.parse(content);

    // safety net: strip any stray markdown that slips through anyway
    parsed.content = parsed.content.replace(/[#*_`>-]/g, "").trim();

    // hard cap: never let saved content exceed 110 words
    const words = parsed.content.split(/\s+/);
    if (words.length > 110) {
      parsed.content = words.slice(0, 110).join(" ") + ".";
    }

    return parsed;

  } catch (error) {
    console.error("GROQ ERROR:", error);
    throw error;
  }
}

export default generateBlog;