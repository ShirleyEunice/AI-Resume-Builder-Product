import API from "@/api/axios";
import ATSScorePanel from "@/components/ATSScorePanel";
import BuilderTopbar from "@/components/resume/BuilderTopbar";
import CertificationForm from "@/components/resume/forms/CertificationForm";
import EducationForm from "@/components/resume/forms/EducationForm";
import ExperienceForm from "@/components/resume/forms/ExperienceForm";
import PersonalInfoForm from "@/components/resume/forms/PersonalInfoForm";
import ProjectsForm from "@/components/resume/forms/ProjectsForm";
import SkillsForm from "@/components/resume/forms/SkillsForm";
import ResumePreview from "@/components/resume/ResumePreview";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ResumeBuilder = () => {
  const { activeSection, currentResume } = useSelector((state) => state.resume);
  const [atsData, setATSData] = useState(null);

  const [analyzing, setAnalyzing] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "personalInfo":
        return <PersonalInfoForm />;

      case "experience":
        return <ExperienceForm />;

      case "education":
        return <EducationForm />;

      case "projects":
        return <ProjectsForm />;

      case "skills":
        return <SkillsForm />;

      case "certifications":
        return <CertificationForm />;

      default:
        return <PersonalInfoForm />;
    }
  };

  const analyzeATSScore = async () => {
    try {
      setAnalyzing(true);

      const res = await API.post("/agent/ats-score", {
        resumeData: currentResume,

        jdText: "Frontend React developer with Node.js experience",
      });

      setATSData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };
  return (
    <div className="h-screen overflow-hidden bg-gray-100 dark:bg-black">
      {/* <PremiumBanner /> */}

      <BuilderTopbar
  analyzeATSScore={analyzeATSScore}
  analyzing={analyzing}
  atsData={atsData}
/>

      {/* MAIN CONTENT */}
      <div className="flex h-[calc(100vh-120px)]">

        {/* FORM PANEL */}
        <div className="flex-1 overflow-y-auto p-6">{renderSection()}</div>

        {/* PREVIEW PANEL */}
        <div className="w-[50%] overflow-y-auto bg-gray-300 p-6">
          <ResumePreview />

          {/* <ATSScorePanel atsData={atsData} /> */}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
