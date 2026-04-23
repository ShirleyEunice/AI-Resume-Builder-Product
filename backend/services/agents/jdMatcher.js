export const jdMatcher = async (resumeText, jdText)=>{
    const keywords = ["JavaScript", "Python", "Java", "C#", "SQL", "AWS", "Azure", "Docker", "Kubernetes", "React", "Angular", "Node.js"];

    const resumeLower = resumeText.toLowerCase();
    const jdLower = jdText.toLowerCase();

    //Find match
    const matched = keywords.filter((k)=> resumeLower.includes(k.toLowerCase()) && jdLower.includes(k.toLowerCase()));

    const missing = keywords.filter((k)=> jdLower.includes(k.toLowerCase()) && !resumeLower.includes(k.toLowerCase()));

    const matchPercentage = Math.floor((matched.length / keywords.length) * 100);

    return ({
        matchPercentage,
        matchedKeywords: matched,
        missingKeywords: missing,
        suggestions: missing.map((m)=> `Consider adding ${m} to your resume if you have experience with it.`)
    })
}