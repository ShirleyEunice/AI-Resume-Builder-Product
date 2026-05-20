import OpenAI from "openai";

const client = new OpenAI({
    api_key:process.env.OPENAI_API_KEY,
})

export const generateSummary = async (role, Skills, experienceLevel)=>{
    const prompt = `Write a professional ATS-friendly resume summary
    Role: ${role}
    Skills: ${Skills}
    Experience Level: ${experienceLevel}
    
    Rules:
    - concise
    - professional
    - impatctful
    - ATS Optimized
    - 3-5 lines`;

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