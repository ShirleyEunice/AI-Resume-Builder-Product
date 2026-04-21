export const calculateATSScore = (resume)=>{
    let score = 0;
    if(resume.title) score += 10;

    if(resume?.personalInfo?.name) score += 10;
    if(resume?.personalInfo?.email) score +=10;

    if(resume.education?.length) score+=20;
    if(resume.experience?.length) score+=20;
    if(resume.skills?.length) score+=20;

    // Keywords matching in skills
    const keywords = ["JavaScript", "React", "Node", "MongoDB"];

    const text = JSON.stringify(resume).toLowerCase();
    let keywordMatches = keywords.filter((k)=>
        text.includes(k.toLowerCase())).length;

    score += keywordMatches * 2;

    //Action verbs
    const verbs = ["developed", "built", "managed", "created", "designed", "implemented"];
    let verbMatches = verbs.filter((v)=>
    text.includes(v.toLowerCase())).length;

    score += verbMatches * 2;

    return Math.min(score, 100);
}