import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const atsScore = async(
    resumeData, jdText
) =>{
    const prompt = `
    You are a ATS resume analyzer.
    
    Analyze the resume against job description.
    
    Resume:
    ${JSON.stringify(resumeData)}
    
    Job Description:
    ${jdText}
    
    Return ONLY valid JSON:
    
    {
    "score" : number,
    "matchedKeywords" : [],
    "missingKeywords" : [],
    "suggestions" : []
    }`;

    return JSON.parse(
        response.choices[0].message.content
    )
}