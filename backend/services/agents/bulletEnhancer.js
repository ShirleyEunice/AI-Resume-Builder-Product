import OpenAI from "openai";

const client = new OpenAI({
    api_key:process.env.OPENAI_API_KEY,
})

export const enhanceBullet = async (bullet, role)=>{
    const prompt = `Rewrite this resume bullet professionally
    Role: ${role}
    Bullet: ${bullet}
    
    Rules:
    - ATS optimized
    - measurable impact if possible
    - concise
    - professional tone
    - action-oriented`;

    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: prompt,
    })
    return response.choices[0].message.content;
}