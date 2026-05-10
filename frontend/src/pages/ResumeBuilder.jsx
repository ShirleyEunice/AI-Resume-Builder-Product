import BuilderTopbar from '@/components/resume/BuilderTopbar';
import CertificationForm from '@/components/resume/forms/CertificationForm';
import EducationForm from '@/components/resume/forms/EducationForm';
import ExperienceForm from '@/components/resume/forms/ExperienceForm';
import PersonalInfoForm from '@/components/resume/forms/PersonalInfoForm'
import ProjectsForm from '@/components/resume/forms/ProjectsForm';
import SkillsForm from '@/components/resume/forms/SkillsForm';
import ResumePreview from '@/components/resume/ResumePreview';
import ResumeSidebar from '@/components/resume/ResumeSidebar';
import AppLayout from '@/layouts/AppLayout';
import PremiumBanner from '@/layouts/PremiumBanner';
import React from 'react'
import { useSelector } from 'react-redux'

const ResumeBuilder = () => {
  const {activeSection} = useSelector((state)=> state.resume);

    const renderSection = () =>{
      switch (activeSection){
        case "personalInfo":
        return <PersonalInfoForm/>;

      case "experience":
        return <ExperienceForm/>;

      case "education":
        return <EducationForm/>;
      
        case "projects":
          return <ProjectsForm/>;

        case "skills":
          return <SkillsForm/>;

        case "certifications":
          return <CertificationForm/>
      
      default:
        return <PersonalInfoForm/>;
      }
    }
  return (
   <div className="h-screen overflow-hidden bg-gray-100 dark:bg-black">

  {/* <PremiumBanner /> */}

  <BuilderTopbar />

  {/* MAIN CONTENT */}
  <div className="flex h-[calc(100vh-120px)]">

    {/* SIDEBAR */}
    <div className="w-64 overflow-y-auto border-r bg-white">
      <ResumeSidebar />
    </div>

    {/* FORM PANEL */}
    <div className="flex-1 overflow-y-auto p-6">
      {renderSection()}
    </div>

    {/* PREVIEW PANEL */}
    <div className="w-[50%] overflow-y-auto bg-gray-300 p-6">
      <ResumePreview />
    </div>

  </div>

</div>
  )
}

export default ResumeBuilder;