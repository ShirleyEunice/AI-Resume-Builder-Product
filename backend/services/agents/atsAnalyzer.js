import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const atsScore = async (
  resumeData,
  jdText
) => {

  const prompt = `
You are an ATS resume analyzer.

Analyze this resume against the job description.

Resume:
${JSON.stringify(resumeData)}

Job Description:
${jdText}

Return ONLY valid JSON:

{
  "score": number,
  "matchedKeywords": [],
  "missingKeywords": [],
  "suggestions": []
}
`;

  const response =
    await client.chat.completions.create({
      model: "gpt-4o-mini",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

  const raw =
    response.choices[0].message.content;

  const cleaned = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};