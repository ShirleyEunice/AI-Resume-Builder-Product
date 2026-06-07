import { useState } from "react";

import StepHeader from "../forms/ui/StepHeader";
import AccordionCard from "./AccordionCard";

import SkillsAccordion from "./SkillsAccordion";
import CertificationAccordion from "./CertificationAccordion";
import AwardsAccordion from "./AwardsAccordion";
import VolunteerAccordion from "./VolunteerAccordion";
import ProjectsAccordion from "./ProjectsAccordion";
import LanguagesAccordion from "./LanguagesAccordion";
import PublicationsAccordion from "./PublicationsAccordion";
import InterestsAccordion from "./InterestsAccordion";
import AdditionalAccordion from "./AdditionalAccordion";

const SECTIONS = [
  { key: "skills", title: "Core Skills", subtitle: "Core professional skills", Component: SkillsAccordion },
  { key: "certificates", title: "Certificates", subtitle: "Certifications earned", Component: CertificationAccordion },
  { key: "awards", title: "Awards", subtitle: "Awards received", Component: AwardsAccordion },
  { key: "volunteer", title: "Volunteering", subtitle: "Volunteer positions", Component: VolunteerAccordion },
  { key: "projects", title: "Projects", subtitle: "Promoted projects", Component: ProjectsAccordion },
  { key: "languages", title: "Languages", subtitle: "Languages you speak", Component: LanguagesAccordion },
  { key: "publications", title: "Publications", subtitle: "Published works", Component: PublicationsAccordion },
  { key: "interests", title: "Interests", subtitle: "Personal interests", Component: InterestsAccordion },
  { key: "additional", title: "Additional", subtitle: "Important information that doesn't fit elsewhere", Component: AdditionalAccordion },
];

const AdditionalSection = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (key) =>
    setOpenSection((current) => (current === key ? null : key));

  return (
    <div className="max-w-2xl">
      <StepHeader
        title="Tell us anything else you want to add"
        subtitle="This information is optional, but it can help personalize your resume"
      />

      <div className="space-y-3">
        {SECTIONS.map((section) => (
          <AccordionCard
            key={section.key}
            title={section.title}
            subtitle={section.subtitle}
            open={openSection === section.key}
            onToggle={() => toggleSection(section.key)}
          >
            <section.Component />
          </AccordionCard>
        ))}
      </div>
    </div>
  );
};

export default AdditionalSection;
