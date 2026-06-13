import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import PersonalInfoForm from "@/components/resume/forms/PersonalInfoForm";
import ExperienceForm from "@/components/resume/forms/ExperienceForm";
import EducationForm from "@/components/resume/forms/EducationForm";
import AdditionalSection from "@/components/resume/additional/AdditionalSection";
import DonePage from "@/components/resume/forms/DonePage";

import ResumePreview from "@/components/resume/ResumePreview";
import WizardStepper from "@/components/resume/wizard/WizardStepper";
import WizardNavigation from "@/components/resume/wizard/WizardNavigation";

import useAutoSave from "@/hooks/useAutoSave";

import { createResume } from "@/services/resumeService";
import { setResumeId } from "@/redux/slices/resumeSlice";

const ResumeWizardPage = () => {

  const dispatch = useDispatch();

  const currentResume = useSelector(
    (state) => state.resume.currentResume
  );

  const wizardStep = useSelector(
    (state) => state.resume.wizardStep
  );

  // Prevent duplicate draft creation
  const draftCreated = useRef(false);

  useEffect(() => {

    const createDraft = async () => {

      try {

        // Already exists
        if (currentResume._id) return;

        const { _id, ...resumeData } = currentResume;

        const data = await createResume({
          ...resumeData,
          title: resumeData.title?.trim() || "Untitled Resume",
        });

        dispatch(
          setResumeId(data._id)
        );

      } catch (error) {

        console.error(
          "Create Draft Error:",
          error
        );
      }
    };

    // React StrictMode protection
    if (!draftCreated.current) {

      draftCreated.current = true;

      createDraft();
    }

  }, []);

  // Auto Save Hook
  useAutoSave();

  const renderStep = () => {

    switch (wizardStep) {

      case 1:
        return <PersonalInfoForm />;

      case 2:
        return <ExperienceForm />;

      case 3:
        return <EducationForm />;

      case 4:
        return <AdditionalSection />;

      case 5:
        return <DonePage />;

      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="h-full overflow-hidden flex bg-gray-100">

      {/* LEFT PANEL */}
      <div className="w-[55%] bg-white overflow-y-auto p-8">

        <WizardStepper />

        <div className="mt-10">
          {renderStep()}
        </div>

        <WizardNavigation />

      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 bg-gray-200 overflow-y-auto p-10">

        <div className="flex justify-center">
          <ResumePreview />
        </div>

      </div>

    </div>
  );
};

export default ResumeWizardPage;