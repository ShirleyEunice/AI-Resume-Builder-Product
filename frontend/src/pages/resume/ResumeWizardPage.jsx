import React, { useEffect, useRef, useState } from "react";
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

  const draftCreated = useRef(false);
  const [mobileTab, setMobileTab] = useState("form");

  useEffect(() => {

    const createDraft = async () => {

      try {

        if (currentResume._id) return;

        const { _id, ...resumeData } = currentResume;

        const data = await createResume({
          ...resumeData,
          title: resumeData.title?.trim() || "Untitled Resume",
        });

        dispatch(setResumeId(data._id));

      } catch (error) {
        console.error("Create Draft Error:", error);
      }
    };

    if (!draftCreated.current) {
      draftCreated.current = true;
      createDraft();
    }

  }, []);

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
    <div className="h-full overflow-hidden flex flex-col bg-gray-100">

      {/* Mobile tab toggle */}
      <div className="flex md:hidden border-b bg-white shrink-0">
        <button
          onClick={() => setMobileTab("form")}
          className={`flex-1 py-3 text-sm font-semibold transition ${
            mobileTab === "form"
              ? "text-brand-primary border-b-2 border-brand-primary"
              : "text-gray-400"
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => setMobileTab("preview")}
          className={`flex-1 py-3 text-sm font-semibold transition ${
            mobileTab === "preview"
              ? "text-brand-primary border-b-2 border-brand-primary"
              : "text-gray-400"
          }`}
        >
          Preview
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* LEFT PANEL — form */}
        <div className={`
          bg-white overflow-y-auto p-5 md:p-8
          md:w-[55%] md:block
          ${mobileTab === "form" ? "block w-full" : "hidden"}
        `}>
          <WizardStepper />
          <div className="mt-8">
            {renderStep()}
          </div>
          <WizardNavigation />
        </div>

        {/* RIGHT PANEL — preview */}
        <div className={`
          bg-gray-200 overflow-y-auto p-5 md:p-10
          md:flex md:flex-1 md:justify-center
          ${mobileTab === "preview" ? "flex flex-1 justify-center" : "hidden"}
        `}>
          <ResumePreview />
        </div>

      </div>
    </div>
  );
};

export default ResumeWizardPage;
