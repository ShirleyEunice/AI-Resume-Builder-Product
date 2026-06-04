import CertificationForm from '@/components/resume/forms/CertificationForm';
import DonePage from '@/components/resume/forms/DonePage';
import EducationForm from '@/components/resume/forms/EducationForm';
import ExperienceForm from '@/components/resume/forms/ExperienceForm';
import PersonalInfoForm from '@/components/resume/forms/PersonalInfoForm';
import SkillsForm from '@/components/resume/forms/SkillsForm';
import ResumePreview from '@/components/resume/ResumePreview';
import WizardNavigation from '@/components/resume/wizard/WizardNavigation';
import WizardStepper from '@/components/resume/wizard/WizardStepper';
import useAutoSave from '@/hooks/useAutoSave';
import { setResumeId } from '@/redux/slices/resumeSlice';
import { createResume } from '@/services/resumeService';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ResumeWizardPage = () => {
    const dispatch = useDispatch();
    const currentResume = useSelector((state)=> state.resume.currentResume);
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

    useEffect(() => {

  const createDraft =
    async () => {

    try {

      // already exists
      if (
        currentResume._id
      ) return;

      const data =
        await createResume(
          currentResume
        );

      dispatch(setResumeId(data._id));

    } catch (error) {

      console.error(error);
    }
  };

  createDraft();

}, []);
    useAutoSave();
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