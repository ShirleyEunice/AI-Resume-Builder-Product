import OpenAI from "openai";

export const generateCoverLetter = async (resumeText, jdText, tone = "professional") => {

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing");
  }
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const systemPrompt = `
    You are an expert career writer who crafts tailored, ATS friendly cover letters.

    RULES:
    - Write in a ${tone} tone.
    - Use ONLY facts found in the resume. Never invent employers, dates, degrees, or metrics.
    - Match the candidate's real strengths to the job description's requirements.
    - Structure: greeting, a strong opening hook, 1-2 body paragraphs mapping experience to the role, a closing paragraph with a call to action, and a sign-off.
    - Keep it concise (250-350) eords, personalized, and free of cliches.
    - Return ONLY the cover letter text. No preamble, no markdown, no notes.
    `.trim();

  const userPrompt = `
  RESUME: 
  ${resumeText}
  
  JOB DESCRIPTION:
  ${jdText}
  `.trim();

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.6, //usually ranges between 0 and 2
    messages: [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  return response.choices[0].message.content.trim();
};