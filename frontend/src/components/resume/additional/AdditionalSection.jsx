import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";

import { updateResume } from "@/redux/slices/resumeSlice";
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
  {
    key: "skills",
    title: "Core Skills",
    subtitle: "Core professional skills",
    Component: SkillsAccordion,
  },
  {
    key: "certifications",
    title: "Certificates",
    subtitle: "Certifications earned",
    Component: CertificationAccordion,
  },
  {
    key: "awards",
    title: "Awards",
    subtitle: "Awards received",
    Component: AwardsAccordion,
  },
  {
    key: "volunteer",
    title: "Volunteering",
    subtitle: "Volunteer positions",
    Component: VolunteerAccordion,
  },
  {
    key: "projects",
    title: "Projects",
    subtitle: "Promoted projects",
    Component: ProjectsAccordion,
  },
  {
    key: "languages",
    title: "Languages",
    subtitle: "Languages you speak",
    Component: LanguagesAccordion,
  },
  {
    key: "publications",
    title: "Publications",
    subtitle: "Published works",
    Component: PublicationsAccordion,
  },
  {
    key: "interests",
    title: "Interests",
    subtitle: "Personal interests",
    Component: InterestsAccordion,
  },
  {
    key: "additional",
    title: "Additional",
    subtitle: "Important information that doesn't fit elsewhere",
    Component: AdditionalAccordion,
  },
];

const EMPTY_DEFAULTS = {
  skills: { technical: [], soft: [], tools: [] },
};

const getSectionCount = (key, resume) => {
  if (key === "skills") {
    return (
      (resume.skills?.technical?.length || 0) +
      (resume.skills?.soft?.length || 0) +
      (resume.skills?.tools?.length || 0)
    );
  }
  const val = resume[key];
  return Array.isArray(val) ? val.length : 0;
};

const AdditionalSection = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume.currentResume);

  const [openSection, setOpenSection] = useState(null);
  const [removedKeys, setRemovedKeys] = useState(new Set());

  const toggleSection = (key) =>
    setOpenSection((current) => (current === key ? null : key));

  const removeSection = (key) => {
    dispatch(
      updateResume({ section: key, data: EMPTY_DEFAULTS[key] ?? [] })
    );
    setRemovedKeys((prev) => new Set([...prev, key]));
    if (openSection === key) setOpenSection(null);
  };

  const restoreSection = (key) => {
    setRemovedKeys((prev) => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  };

  const visibleSections = SECTIONS.filter((s) => !removedKeys.has(s.key));
  const hiddenSections = SECTIONS.filter((s) => removedKeys.has(s.key));

  return (
    <div className="max-w-2xl">
      <StepHeader
        title="Tell us anything else you want to add"
        subtitle="This information is optional, but it can help personalize your resume"
      />

      <div className="space-y-3">
        {visibleSections.map((section) => (
          <AccordionCard
            key={section.key}
            title={section.title}
            subtitle={section.subtitle}
            open={openSection === section.key}
            onToggle={() => toggleSection(section.key)}
            onRemove={() => removeSection(section.key)}
            count={getSectionCount(section.key, resume)}
          >
            <section.Component />
          </AccordionCard>
        ))}
      </div>

      {/* Removed sections — restore chips */}
      {hiddenSections.length > 0 && (
        <div className="mt-6 rounded-lg border border-dashed border-gray-200 p-4">
          <p className="mb-3 text-xs font-medium text-gray-500">
            Removed sections — click to restore
          </p>
          <div className="flex flex-wrap gap-2">
            {hiddenSections.map((section) => (
              <button
                key={section.key}
                type="button"
                onClick={() => restoreSection(section.key)}
                className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-500 transition-colors hover:border-brand-primary hover:text-brand-primary"
              >
                <Plus size={12} />
                {section.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdditionalSection;
