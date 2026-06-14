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
import { generatePDF } from "@/utils/generatePDF";
import { sendResumeEmail } from "@/services/emailService";

const TEMPLATE_W = 794; // 210mm at 96 dpi

const ResumeWizardPage = () => {

  const dispatch = useDispatch();
  const resumeTitle = useSelector((state) => state.resume.currentResume.title);
  const currentResume = useSelector((state) => state.resume.currentResume);
  const wizardStep = useSelector((state) => state.resume.wizardStep);

  const draftCreated = useRef(false);
  const [mobileTab, setMobileTab] = useState("form");

  // Scaling state for the preview panel
  const previewPanelRef  = useRef(null);
  const scaleInnerRef    = useRef(null);   // the div with transform:scale — reset before PDF
  const [scale, setScale] = useState(1);
  const [scaledH, setScaledH] = useState(1122); // approx 297mm at 96dpi

  // Recalculate scale whenever the panel becomes visible or the window resizes
  useEffect(() => {
    const recalc = () => {
      const panel = previewPanelRef.current;
      const inner = scaleInnerRef.current;
      if (!panel) return;

      const available = panel.clientWidth - 80; // 40px breathing room each side
      const s = Math.min(0.95, available / TEMPLATE_W);
      if (s > 0) {
        setScale(s);
        if (inner) setScaledH(inner.scrollHeight * s);
      }
    };

    recalc();
    const observer = new ResizeObserver(recalc);
    if (previewPanelRef.current) observer.observe(previewPanelRef.current);
    return () => observer.disconnect();
  }, [mobileTab]); // re-run when tab switches (panel visibility changes)

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
      case 1: return <PersonalInfoForm />;
      case 2: return <ExperienceForm />;
      case 3: return <EducationForm />;
      case 4: return <AdditionalSection />;
      case 5: return <DonePage onDownload={captureAndDownload} />;
      default: return <PersonalInfoForm />;
    }
  };

  const captureAndDownload = async () => {
    const wasOnForm = mobileTab === "form";
    if (wasOnForm) setMobileTab("preview");
    await new Promise((r) => setTimeout(r, 350));

    // Clone the template into a clean off-screen container with no parent
    // transforms or flex constraints — html2canvas captures it at true 794px width.
    const original = document.getElementById('resume-template');
    if (!original) throw new Error('Resume template element not found');

    const offscreen = document.createElement('div');
    offscreen.style.cssText = `
      position: fixed;
      left: -${TEMPLATE_W + 50}px;
      top: 0;
      width: ${TEMPLATE_W}px;
      background: white;
      z-index: -1;
      pointer-events: none;
    `;
    const clone = original.cloneNode(true);
    offscreen.appendChild(clone);
    document.body.appendChild(offscreen);

    await new Promise((r) => setTimeout(r, 150));

    try {
      const { pdf, base64 } = await generatePDF(clone);
      const fileName = (resumeTitle || "resume").trim();
      pdf.save(`${fileName}.pdf`);
      await sendResumeEmail({ resumeTitle: fileName, pdfBase64: base64 });
    } catch (error) {
      console.error("Error generating PDF", error);
      throw error;
    } finally {
      document.body.removeChild(offscreen);
      if (wasOnForm) setMobileTab("form");
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
          <div className="mt-8">{renderStep()}</div>
          <WizardNavigation />
        </div>

        {/* RIGHT PANEL — preview */}
        <div
          ref={previewPanelRef}
          className={`
            bg-gray-300 overflow-y-auto overflow-x-hidden
            md:flex md:flex-1 md:justify-center md:items-start
            py-8 px-6
            ${mobileTab === "preview" ? "flex flex-1 justify-center items-start" : "hidden"}
          `}
        >
          {/*
            Outer box — tells the flex layout how much space the scaled template occupies.
            Width  = template natural width × scale
            Height = template natural height × scale  (keeps scrollbar proportional)
          */}
          <div style={{ width: TEMPLATE_W * scale, height: scaledH, flexShrink: 0 }}>
            {/*
              Inner box — applies the visual scale.
              transform-origin top-left so it anchors to the outer box's top-left corner.
            */}
            <div
              ref={scaleInnerRef}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: TEMPLATE_W,
              }}
            >
              <ResumePreview />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResumeWizardPage;
