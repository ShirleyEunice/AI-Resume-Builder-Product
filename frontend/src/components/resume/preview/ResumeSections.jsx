import { useSelector } from "react-redux";

const dateRange = (start, end, current) => {
  if (!start && !end && !current) return "";
  const tail = current ? "Present" : end || "";
  return [start, tail].filter(Boolean).join(" – ");
};

const join = (...parts) => parts.filter(Boolean).join(", ");

const SectionTitle = ({ variant, children, color }) => {
  if (variant === "classic") {
    return (
      <h2
        className="text-sm font-bold uppercase tracking-wide pb-1 mb-2 border-b"
        style={{ color, borderColor: color }}
      >
        {children}
      </h2>
    );
  }
  if (variant === "minimal") {
    return (
      <h2
        className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-2"
        style={{ color }}
      >
        {children}
      </h2>
    );
  }
  return (
    <h2
      className="text-sm font-bold uppercase pb-1 mb-2 border-b-2"
      style={{ color, borderColor: color }}
    >
      {children}
    </h2>
  );
};

const ResumeSections = ({ variant = "modern" }) => {
  const resume = useSelector((state) => state.resume.currentResume);

  const accentColor = resume.layoutSettings?.accentColor || "#0d9488";

  const accentStyle =
    variant === "modern"
      ? { color: accentColor }
      : variant === "classic"
      ? { color: "#374151" }
      : { color: "#6b7280" };

  const {
    personalInfo = {},
    experience = [],
    education = [],
    skills = {},
    projects = [],
    certifications = [],
    awards = [],
    volunteer = [],
    publications = [],
    languages = [],
    interests = [],
    additional = [],
  } = resume;

  const mergedSkills = [
    ...(skills.technical || []),
    ...(skills.tools || []),
    ...(skills.soft || []),
  ];

  const experienceItems = experience.length
    ? experience
    : [{ jobTitle: "Frontend Developer", employer: "Acme Corp", startDate: "2022", current: true, highlights: ["Built and shipped customer-facing features."] }];

  const educationItems = education.length
    ? education
    : [{ degreeType: "Bachelor of Computer Science", institution: "University of Kansas", startDate: "2018", endDate: "2022" }];

  const skillItems = mergedSkills.length
    ? mergedSkills
    : ["React", "Node.js", "MongoDB", "JavaScript", "Tailwind CSS"];

  return (
    <div className="space-y-4">

      <section>
        <SectionTitle variant={variant} color={accentColor}>Professional Summary</SectionTitle>
        <p className="text-xs text-gray-700">
          {personalInfo.summary || "Motivated and detail-oriented professional seeking to contribute to organizational success while developing professional expertise."}
        </p>
      </section>

      <section>
        <SectionTitle variant={variant} color={accentColor}>Experience</SectionTitle>
        {experienceItems.map((exp, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between">
              <h3 className="text-xs font-semibold">{exp.jobTitle || exp.role}</h3>
              <span className="text-[11px] text-gray-500">{dateRange(exp.startDate, exp.endDate, exp.current)}</span>
            </div>
            <p className="text-xs" style={accentStyle}>{join(exp.employer || exp.company, exp.location)}</p>
            {exp.summary && <p className="mt-1 text-xs text-gray-700">{exp.summary}</p>}
            {(exp.highlights || exp.bullets || []).filter(Boolean).length > 0 && (
              <ul className="ml-4 mt-1 list-disc text-xs text-gray-700">
                {(exp.highlights || exp.bullets || []).filter(Boolean).map((h, hi) => <li key={hi}>{h}</li>)}
              </ul>
            )}
          </div>
        ))}
      </section>

      <section>
        <SectionTitle variant={variant} color={accentColor}>Education</SectionTitle>
        {educationItems.map((edu, i) => {
          const degreeTitle = join(edu.degreeType || edu.degree, edu.areaOfStudy || edu.field);
          const institutionLine = join(edu.institution, edu.location);
          return (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-xs font-semibold">{degreeTitle || institutionLine}</h3>
                <span className="text-[11px] text-gray-500 shrink-0">{dateRange(edu.startDate, edu.endDate)}</span>
              </div>
              {degreeTitle && institutionLine && (
                <p className="text-xs" style={accentStyle}>{institutionLine}</p>
              )}
              {edu.gpa && <p className="text-[11px] text-gray-500">GPA: {edu.gpa}</p>}
              {(edu.minor || []).length > 0 && <p className="text-[11px] text-gray-600">Minor: {edu.minor.join(", ")}</p>}
              {(edu.coursework || []).length > 0 && <p className="text-[11px] text-gray-600">Coursework: {edu.coursework.join(", ")}</p>}
            </div>
          );
        })}
      </section>

      <section>
        <SectionTitle variant={variant} color={accentColor}>Skills</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {skillItems.map((skill, i) => (
            <span key={i} className="rounded border bg-gray-100 px-2 py-1 text-[11px] text-gray-700">{skill}</span>
          ))}
        </div>
      </section>

      {projects.length > 0 && (
        <section>
          <SectionTitle variant={variant} color={accentColor}>Projects</SectionTitle>
          {projects.map((p, i) => (
            <div key={i} className="mb-3">
              <h3 className="text-xs font-semibold">{p.title}</h3>
              {(p.techStack || []).length > 0 && <p className="text-[11px]" style={accentStyle}>{p.techStack.join(", ")}</p>}
              {p.description && <p className="mt-1 text-xs text-gray-700">{p.description}</p>}
            </div>
          ))}
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          <SectionTitle variant={variant} color={accentColor}>Certifications</SectionTitle>
          {certifications.map((c, i) => (
            <div key={i} className="mb-1 flex justify-between items-start gap-3">
              <span className="text-xs text-gray-700">{join(c.name, c.issuer)}</span>
              <span className="text-[11px] text-gray-500 shrink-0">{c.year}</span>
            </div>
          ))}
        </section>
      )}

      {awards.length > 0 && (
        <section>
          <SectionTitle variant={variant} color={accentColor}>Awards</SectionTitle>
          {awards.map((a, i) => (
            <div key={i} className="mb-1 flex justify-between">
              <span className="text-xs text-gray-700">{join(a.title, a.issuer)}</span>
              <span className="text-[11px] text-gray-500">{a.year}</span>
            </div>
          ))}
        </section>
      )}

      {volunteer.length > 0 && (
        <section>
          <SectionTitle variant={variant} color={accentColor}>Volunteering</SectionTitle>
          {volunteer.map((v, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <h3 className="text-xs font-semibold">{join(v.role, v.organization)}</h3>
                <span className="text-[11px] text-gray-500">{dateRange(v.startDate, v.endDate)}</span>
              </div>
              {v.description && <p className="text-xs text-gray-700">{v.description}</p>}
            </div>
          ))}
        </section>
      )}

      {publications.length > 0 && (
        <section>
          <SectionTitle variant={variant} color={accentColor}>Publications</SectionTitle>
          {publications.map((p, i) => (
            <div key={i} className="mb-1">
              <span className="text-xs text-gray-700">{join(p.title, p.publisher)}</span>
              {p.year && <span className="text-[11px] text-gray-500"> ({p.year})</span>}
            </div>
          ))}
        </section>
      )}

      {languages.length > 0 && (
        <section>
          <SectionTitle variant={variant} color={accentColor}>Languages</SectionTitle>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {languages.map((l, i) => (
              <span key={i} className="text-xs text-gray-700">
                {l.name}{l.proficiency && <span className="text-gray-500"> — {l.proficiency}</span>}
              </span>
            ))}
          </div>
        </section>
      )}

      {interests.length > 0 && (
        <section>
          <SectionTitle variant={variant} color={accentColor}>Interests</SectionTitle>
          <p className="text-xs text-gray-700">{interests.join(", ")}</p>
        </section>
      )}

      {additional.length > 0 && (
        <section>
          <SectionTitle variant={variant} color={accentColor}>Additional</SectionTitle>
          {additional.map((a, i) => (
            <div key={i} className="mb-1">
              {a.title && <span className="text-xs font-semibold text-gray-800">{a.title}: </span>}
              <span className="text-xs text-gray-700">{a.description}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ResumeSections;
