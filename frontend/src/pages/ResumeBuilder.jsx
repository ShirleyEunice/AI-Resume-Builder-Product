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
    <>
      <BuilderTopbar/>
    <div className='flex h-[calc(87vh-120px)] bg-gray-100 dark:bg-black'>
      {/* Sidebar */}
      <div className="w-64 border-r bg-white dark-bg-gray-900">
        <ResumeSidebar/>
      </div>

      {/* Dynamic Form */}
      <div className='flex-1 overflow-y-auto p-6'>
        {renderSection()}
      </div>

      {/* Live Preview */}
      <div className="w-[50%] border-1 bg-gray-50 dark:bg-gray-950 overflow-y-auto p-6">
        <ResumePreview/>
      </div>
    </div>
    </>
  )
}

export default ResumeBuilder;