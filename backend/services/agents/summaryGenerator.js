import OpenAI from "openai";

const client = new OpenAI({
    api_key:process.env.OPENAI_API_KEY,
})

export const generateSummary = async (role, Skills, experienceLevel)=>{
    const prompt = `
Rewrite this resume experience bullet professionally.

Role: ${role}

Original Bullet:
${bullet}

Instructions:
- Rewrite naturally and professionally
- Keep it concise and ATS-friendly
- Use strong action verbs
- Improve clarity and readability
- DO NOT invent fake metrics, percentages, or placeholders like X%
- ONLY include measurable impact if explicitly mentioned
- Do NOT exaggerate achievements
- Return plain text only
- Do NOT include bullet symbols
`;

    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages:[
            {
                role: "user",
                content: prompt,
            }
        ]
    });
    return response.choices[0].message.content;
}