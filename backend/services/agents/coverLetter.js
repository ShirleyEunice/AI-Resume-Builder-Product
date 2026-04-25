import OpenAI from "openai";

console.log("ENV KEY:", process.env.OPENAI_API_KEY);

export const generateCoverLetter = async (resumeText, jdText, tone) => {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing");
  }
  const prompt = `
    Write a ${tone} cover letter based on:

    Resume:
    ${resumeText}

    Job Description:
    ${jdText}

    keep it concise, relevant and personalized.
    `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
};