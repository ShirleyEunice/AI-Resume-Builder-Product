import { calculateATSScore } from "../ats/scorer.js";

export const analyseResume = async (text)=>{
    const keywords = ["React", "Node", "JavaScript", "Python", "Django", "Flask", "AWS", "Azure", "GCP", "Docker", "Kubernetes"];
    const missing = keywords.filter(keyword => !text.includes(keyword));

    const score = calculateATSScore({
        skills: keywords.filter(k => text.includes(k)),
        experience: text.length > 50 ? ["yes"] : [],
        education: text.includes("Bachelor") ? ["yes"] : []
    });

    return {
      score,
      missingKeywords: missing,
      suggestions: [
        "Add more measurable achievements",
        "Include more relevant keywords",
        "Improve formatting consistency",
      ],
    };
}