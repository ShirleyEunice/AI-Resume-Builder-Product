import TemplateWrapper from "./TemplateWrapper";

import ResumeHeader from "../../preview/header/ModernHeader";
import SummarySection from "../../preview/SummarySection";
import ExperienceSection from "../../preview/ExperienceSection";
import EducationSection from "../../preview/EducationSection";
import ProjectsSection from "../../preview/ProjectsSection";
import SkillsSection from "../../preview/SkillsSection";
import ModernHeader from "../../preview/header/ModernHeader";

const ModernTemplate = () => {

  return (

    <TemplateWrapper>

      <ModernHeader />

      <SummarySection />

      <ExperienceSection />

      <EducationSection />

      <ProjectsSection />

      <SkillsSection />

    </TemplateWrapper>

  );
};

export default ModernTemplate;