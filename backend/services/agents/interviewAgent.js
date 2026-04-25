import OpenAI from "openai";

export const runInterviewAgent = async (user, chatHistory, question) => {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const model = user.isPremium ? "gpt-4o" : "gpt-4o-mini";

  const systemPrompt = `
You are a senior interview coach.

IMPORTANT FORMATTING RULES:
- Use short, clear sections
- Use bullet points (• or -)
- Keep answers concise
- Avoid long paragraphs
- Break content into readable blocks
- Use headings with **bold text**

RESPONSE STRUCTURE:

1. **Question**
2. **Key Points**
   - bullet
   - bullet
3. **Sample Answer**
   - short, structured
4. **Feedback**
   - improvement tips

ADDITIONAL RULES:
- Always use markdown-style formatting
- Use line breaks between sections
- Keep each section under 5 lines

STYLE:
- Friendly but professional
- Easy to read in chat UI
- No large paragraphs

Always format like a clean chat response.
`;


  const messages = [
    { role: "system", content: systemPrompt },
    ...chatHistory,
    { role: "user", content: question },
  ];

  const response = await client.chat.completions.create({
    model,
    messages,
  });

  return response.choices[0].message.content;
};