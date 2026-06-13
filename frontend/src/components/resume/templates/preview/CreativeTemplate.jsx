import { useSelector } from "react-redux";

import TemplateWrapper from "./TemplateWrapper";

const join = (...parts) => parts.filter(Boolean).join(", ");

const dateRange = (start, end, current) => {
  if (!start && !end && !current) return "";
  const tail = current ? "Present" : end || "";
  return [start, tail].filter(Boolean).join(" – ");
};

const SideTitle = ({ children }) => (
  <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/80">
    {children}
  </h2>
);

const MainTitle = ({ children, color }) => (
  <h2 className="mb-2 text-sm font-bold" style={{ color }}>{children}</h2>
);

const CreativeTemplate = () => {
  const resume = useSelector((state) => state.resume.currentResume);
  const accentColor = resume.layoutSettings?.accentColor || "#0d9488";

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

  const location =
    join(personalInfo.city, personalInfo.state, personalInfo.country) ||
    personalInfo.location;

  const mergedSkills = [
    ...(skills.technical || []),
    ...(skills.tools || []),
    ...(skills.soft || []),
  ];

  const skillItems = mergedSkills.length
    ? mergedSkills
    : ["React", "Node.js", "Figma"];

  return (
    <TemplateWrapper>
      <div className="-m-[0.75in] flex min-h-full font-sans">
        {/* SIDEBAR */}
        <div className="w-[32%] space-y-6 p-5 text-white" style={{ backgroundColor: accentColor }}>
          <div>
            <h1 className="text-lg font-bold leading-tight">
              {personalInfo.fullName || "Jennifer Jobscan"}
            </h1>
            <p className="mt-1 text-[11px] text-white/80">
              {personalInfo.jobTitle || "Creative Product Manager"}
            </p>
          </div>

          <div>
            <SideTitle>Contact</SideTitle>
            <div className="space-y-1 text-[11px] text-white/90">
              {personalInfo.email && <p>{personalInfo.email}</p>}
              {personalInfo.phone && <p>{personalInfo.phone}</p>}
              {location && <p>{location}</p>}
              {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
              {(personalInfo.websites || []).map((w, i) => (
                <p key={i}>{w}</p>
              ))}
            </div>
          </div>

          <div>
            <SideTitle>Skills</SideTitle>
            <div className="flex flex-wrap gap-1">
              {skillItems.map((s, i) => (
                <span
                  key={i}
                  className="rounded-full bg-white/20 px-2 py-1 text-[10px]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {languages.length > 0 && (
            <div>
              <SideTitle>Languages</SideTitle>
              <div className="space-y-1 text-[11px] text-white/90">
                {languages.map((l, i) => (
                  <p key={i}>
                    {l.name}
                    {l.proficiency && (
                      <span className="text-white/70"> — {l.proficiency}</span>
                    )}
                  </p>
                ))}
              </div>
            </div>
          )}

          {interests.length > 0 && (
            <div>
              <SideTitle>Interests</SideTitle>
              <p className="text-[11px] text-white/90">
                {interests.join(", ")}
              </p>
            </div>
          )}
        </div>

        {/* MAIN */}
        <div className="flex-1 space-y-4 p-5">
          <section>
            <MainTitle color={accentColor}>About Me</MainTitle>
            <p className="text-xs text-gray-700">
              {personalInfo.summary ||
                "Creative and detail-oriented professional passionate about building innovative products and delivering exceptional user experiences."}
            </p>
          </section>

          {experience.length > 0 && (
            <section>
              <MainTitle color={accentColor}>Experience</MainTitle>
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="mb-3 border-l-2 pl-3"
                  style={{ borderColor: accentColor }}
                >
                  <h3 className="text-xs font-semibold">
                    {exp.jobTitle || exp.role}
                  </h3>
                  <p className="text-[11px]" style={{ color: accentColor }}>
                    {join(exp.employer || exp.company, exp.location)}
                    {dateRange(exp.startDate, exp.endDate, exp.current) &&
                      ` • ${dateRange(exp.startDate, exp.endDate, exp.current)}`}
                  </p>
                  {exp.summary && (
                    <p className="mt-1 text-xs text-gray-700">{exp.summary}</p>
                  )}
                  {(exp.highlights || []).filter(Boolean).length > 0 && (
                    <ul className="ml-4 mt-1 list-disc text-xs text-gray-700">
                      {(exp.highlights || [])
                        .filter(Boolean)
                        .map((h, hi) => (
                          <li key={hi}>{h}</li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section>
              <MainTitle color={accentColor}>Education</MainTitle>
              {education.map((edu, i) => (
                <div key={i} className="mb-2">
                  <h3 className="text-xs font-semibold">
                    {join(
                      edu.degreeType || edu.degree,
                      edu.areaOfStudy || edu.field,
                    )}
                  </h3>
                  <p className="text-[11px] text-gray-600">
                    {join(edu.institution, edu.location)}
                  </p>
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <MainTitle color={accentColor}>Projects</MainTitle>
              {projects.map((p, i) => (
                <div key={i} className="mb-2">
                  <h3 className="text-xs font-semibold">{p.title}</h3>
                  {p.description && (
                    <p className="text-xs text-gray-700">{p.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <MainTitle color={accentColor}>Certifications</MainTitle>
              {certifications.map((c, i) => (
                <p key={i} className="text-xs text-gray-700">
                  {join(c.name, c.issuer)} {c.year && `(${c.year})`}
                </p>
              ))}
            </section>
          )}

          {awards.length > 0 && (
            <section>
              <MainTitle color={accentColor}>Awards</MainTitle>
              {awards.map((a, i) => (
                <p key={i} className="text-xs text-gray-700">
                  {join(a.title, a.issuer)} {a.year && `(${a.year})`}
                </p>
              ))}
            </section>
          )}

          {volunteer.length > 0 && (
            <section>
              <MainTitle color={accentColor}>Volunteering</MainTitle>
              {volunteer.map((v, i) => (
                <div key={i} className="mb-2">
                  <h3 className="text-xs font-semibold">
                    {join(v.role, v.organization)}
                  </h3>
                  {v.description && (
                    <p className="text-xs text-gray-700">{v.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {publications.length > 0 && (
            <section>
              <MainTitle color={accentColor}>Publications</MainTitle>
              {publications.map((p, i) => (
                <p key={i} className="text-xs text-gray-700">
                  {join(p.title, p.publisher)} {p.year && `(${p.year})`}
                </p>
              ))}
            </section>
          )}

          {additional.length > 0 && (
            <section>
              <MainTitle color={accentColor}>Additional</MainTitle>
              {additional.map((a, i) => (
                <p key={i} className="text-xs text-gray-700">
                  {a.title && (
                    <span className="font-semibold">{a.title}: </span>
                  )}
                  {a.description}
                </p>
              ))}
            </section>
          )}
        </div>
      </div>
    </TemplateWrapper>
  );
};

export default CreativeTemplate;
