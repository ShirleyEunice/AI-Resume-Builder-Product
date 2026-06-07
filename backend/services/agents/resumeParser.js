import OpenAI from 'openai';

export const parseResumeToJSON = async (resumeText, source = "resume")=>{
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // LinkedIn "Save to PDF" exports have predictable quirks worth hinting at.
    const linkedinHints = source === "linkedin" ? `
  LINKEDIN PDF NOTES (this text came from a LinkedIn "Save to PDF" export):
  - The person's name and headline usually appear at the very top; use the headline as personalInfo.jobTitle.
  - A "Contact" block holds email / phone / profile URL -> map URL to personalInfo.linkedin.
  - "Top Skills" / "Skills" -> skills.technical (or tools/soft as appropriate).
  - "Summary" or "About" -> personalInfo.summary.
  - Under each role, bullet/description lines -> highlights.
  - Ignore boilerplate like "Page 1 of 2" and repeated header/footer lines.
` : "";

    const prompt = ` You are a resume parser. Extract the resume below into VALID JSON ONLY.

  Use EXACTLY this structure (omit nothing; use "" or [] when unknown):
  {
    "title": "",
    "personalInfo": {
      "fullName": "", "jobTitle": "", "email": "", "phone": "",
      "linkedin": "", "websites": [], "summary": "",
      "address": "", "city": "", "state": "", "postalCode": "", "country": ""
    },
    "experience": [
      { "jobTitle": "", "employer": "", "location": "", "url": "",
        "startDate": "", "endDate": "", "current": false,
        "summary": "", "highlights": [] }
    ],
    "education": [
      { "institution": "", "location": "", "degreeType": "", "areaOfStudy": "",
        "startDate": "", "endDate": "", "gpa": "", "url": "",
        "minor": [], "coursework": [] }
    ],
    "skills": { "technical": [], "soft": [], "tools": [] },
    "certifications": [{ "name": "", "issuer": "", "year": "", "url": "" }],
    "awards": [{ "title": "", "issuer": "", "year": "" }],
    "volunteer": [{ "organization": "", "role": "", "startDate": "", "endDate": "", "description": "" }],
    "projects": [{ "title": "", "techStack": [], "link": "", "description": "" }],
    "languages": [{ "name": "", "proficiency": "" }],
    "publications": [{ "title": "", "publisher": "", "year": "", "url": "" }],
    "interests": [],
    "additional": [{ "title": "", "description": "" }]
  }

  RULES:
  - Dates as "Mon YYYY" (e.g. "Mar 2023"). If a job is ongoing, set "current": true and "endDate": "".
  - "highlights" = bullet points under a job. "summary" = the role's one-line description.
  - Do NOT invent data. Return ONLY the JSON object.
${linkedinHints}
  RESUME:
  ${resumeText}
  `;

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages:[
        {role: 'system', content: 'You extract resume into strict JSON.'},
        {role: 'user', content: prompt}
     ],
     temperature: 0.2,
  });

  const content = response.choices[0].message.content;

  try {
      const cleaned = content
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
      return JSON.parse(cleaned);
  } catch (error) {
      console.error("AI RAW RESPONSE:", content);
      throw new Error("Failed to parse resume JSON.");
  }
}