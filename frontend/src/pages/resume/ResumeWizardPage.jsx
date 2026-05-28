import CertificationForm from '@/components/resume/forms/CertificationForm';
import DonePage from '@/components/resume/forms/DonePage';
import EducationForm from '@/components/resume/forms/EducationForm';
import ExperienceForm from '@/components/resume/forms/ExperienceForm';
import PersonalInfoForm from '@/components/resume/forms/PersonalInfoForm';
import SkillsForm from '@/components/resume/forms/SkillsForm';
import ResumePreview from '@/components/resume/ResumePreview';
import WizardNavigation from '@/components/resume/wizard/WizardNavigation';
import WizardStepper from '@/components/resume/wizard/WizardStepper';
import { div } from 'framer-motion/client';
import React from 'react'
import { useSelector } from 'react-redux'

const ResumeWizardPage = () => {
    const wizardStep = useSelector((state)=> state.resume.wizardStep);
    const renderStep = ()=>{
        switch(wizardStep){
            case 1:
                return <PersonalInfoForm/>;
            case 2:
                return <ExperienceForm/>;
            case 3:
                return <EducationForm/>;
            case 4:
                return(
                    <div className='space-y-10'>
                        <SkillsForm/>
                        <CertificationForm/>
                    </div>
                );
            case 5:
                return (
                    <DonePage/>
                );
            default:
                return <PersonalInfoForm/>
        }
    }
  return (
    <div className='h-screen overflow-hidden flex bg-gray-100'>
        {/* Left */}
        <div className='w-[55%] bg-white overflow-y-auto p-8'>
            <WizardStepper/>
            <div className='mt-10'>
                {renderStep()}
            </div>
            <WizardNavigation/>
        </div>

        {/* Right */}
        <div className='flex-1 bg-gray-200 overflow-y-auto p-10'>
            <div className='flex justify-center'>
                <ResumePreview/>
            </div>
        </div>
    </div>
  )
}

export default ResumeWizardPage