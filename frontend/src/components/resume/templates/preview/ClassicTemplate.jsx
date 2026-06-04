import React from "react";
import TemplateWrapper from "./TemplateWrapper";

import ResumeHeader from "../../preview/header/ModernHeader";
import SummarySection from "../../preview/SummarySection";
import ExperienceSection from "../../preview/ExperienceSection";
import EducationSection from "../../preview/EducationSection";
import ProjectsSection from "../../preview/ProjectsSection";
import SkillsSection from "../../preview/SkillsSection";
import ClassicHeader from "../../preview/header/ClassicHeader";

const ClassicTemplate = () => {

  return (

    <TemplateWrapper>

      {/* CLASSIC HEADER */}

      <div
        className="
          text-center
          border-b-2
          border-gray-700
          pb-3
          mb-4
        "
      >

        <ClassicHeader />

      </div>

      {/* CONTENT */}

      <div className="space-y-4">

        <SummarySection />

        <ExperienceSection />

        <EducationSection />

        <ProjectsSection />

        <SkillsSection />

      </div>

    </TemplateWrapper>

  );
};

export default ClassicTemplate;