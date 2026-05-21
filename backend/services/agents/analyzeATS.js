import OpenAI from "openai";

export const analyzeATS =
  async (
    resumeText,
    jdText
  ) => {

  const client =
    new OpenAI({

      apiKey:
        process.env.OPENAI_API_KEY,
    });

  const prompt = `
You are an advanced ATS resume analyzer.

Analyze the resume against the job description.

RETURN ONLY VALID JSON.

Required JSON structure:

{
  "score": number,
  "missingSkills": [],
  "strengths": [],
  "suggestions": [],
  "summary": ""
}

RULES:
- ATS score must be between 0-100
- missingSkills should contain important missing keywords
- strengths should contain strong matching areas
- suggestions should contain actionable resume improvements
- summary should be concise and professional

JOB DESCRIPTION:
${jdText}

RESUME:
${resumeText}
`;

  const response =
    await client.chat.completions.create({

      model: "gpt-4o-mini",

      messages: [
        {
          role: "system",
          content:
            "You are a professional ATS analyzer.",
        },

        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.4,
    });

  const content =
    response.choices[0]
    .message.content;

  try {

    return JSON.parse(content);

  } catch {

    throw new Error(
      "Invalid AI response format"
    );
  }
};