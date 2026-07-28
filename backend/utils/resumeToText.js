export const resumeToText = (resume)=>{
    if(!resume) return "";

    const p = resume.personalInfo || {};
    const lines = [];

    if(p.fullName) lines.push(p.fullName);
    if(p.jobTitle) lines.push(p.jobTitle);

    const contact = [p.email, p.phone, p.city, p.country].filter(Boolean).join(" | ");
    if(contact) lines.push(contact);
    if(p.summary) lines.push(`\nSUMMARY\n${p.summary}`);

    if(resume.experience?.length){
        lines.push("\nEXPERIENCE");
        resume.experience.forEach((exp) => {
            const dates = [exp.startDate, exp.current ? "Present" : exp.endDate]
            .filter(Boolean)
            .join(" - ");
            lines.push(`${exp.jobTitle || ""} at ${exp.employer || ""} (${dates})`);
            if(exp.summary) lines.push(exp.summary);
            (exp.highlights || []).forEach((h) => lines.push(`- ${h}`));
        });
    }

    if (resume.education?.length) {
      lines.push("\nEDUCATION");
      resume.education.forEach((edu) => {
        lines.push(
          `${edu.degreeType || ""} ${edu.areaOfStudy || ""} - ${edu.institution || ""}`.trim()
        );
      });
    }

    const s = resume.skills || {};
    const allSkills = [...(s.technical || []), ...(s.soft || []), ...(s.tools || [])];
    if (allSkills.length) lines.push(`\nSKILLS\n${allSkills.join(", ")}`);

    if (resume.projects?.length) {
      lines.push("\nPROJECTS");
      resume.projects.forEach((proj) =>
        lines.push(`${proj.title || ""}: ${proj.description || ""}`)
      );
    }

    if (resume.certifications?.length) {
      lines.push("\nCERTIFICATIONS");
      resume.certifications.forEach((c) => lines.push(`${c.name || ""} - ${c.issuer || ""}`));
    }

    return lines.join("\n");
}