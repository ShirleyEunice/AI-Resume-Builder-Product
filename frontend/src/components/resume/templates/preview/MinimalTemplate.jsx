import React from "react";

import TemplateWrapper from "./TemplateWrapper";
import SummarySection from "../../preview/SummarySection";
import ExperienceSection from "../../preview/ExperienceSection";
import EducationSection from "../../preview/EducationSection";
import ProjectsSection from "../../preview/ProjectsSection";
import SkillsSection from "../../preview/SkillsSection";
import MinimalHeader from "../../preview/header/MinimalHeader";

const MinimalTemplate = () => {

  return (

    <TemplateWrapper>

      <MinimalHeader />

      <div className="space-y-5 mt-5">

        <SummarySection />

        <ExperienceSection />

        <EducationSection />

        <ProjectsSection />

        <SkillsSection />

      </div>

    </TemplateWrapper>

  );
};

export default MinimalTemplate;