import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Download, FileCheck2, Star } from "lucide-react";
import toast from "react-hot-toast";

import { previousStep, setResumeTitle } from "@/redux/slices/resumeSlice";

const DonePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const title = useSelector((state) => state.resume.currentResume.title);
  const [downloading, setDownloading] = useState(false);

  // Typing the name updates currentResume.title in Redux, which the
  // debounced useAutoSave hook (mounted in ResumeWizardPage) persists to the DB.
  const handleNameChange = (e) => dispatch(setResumeTitle(e.target.value));

  const handleDownload = () => {
    setDownloading(true);

    // TODO: generate and download the resume PDF (separate task).
    // The title/content is already saved via the auto-save debounce.
    toast.success("Resume saved! PDF download is coming soon.");
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center py-10 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-brand-primary/10">
        <FileCheck2 size={44} className="text-brand-primary" />
      </div>

      <h1 className="text-2xl font-bold text-brand-dark">
        You've finished creating your resume 🙌
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Use this resume as the base to optimize for future job applications
      </p>

      <div className="mt-8 w-full max-w-sm text-left">
        <label className="mb-1 block text-sm font-semibold text-brand-dark">
          Give your resume a name
        </label>

        <div className="relative">
          <Star
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={title || ""}
            onChange={handleNameChange}
            placeholder="Resume"
            className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm
              text-brand-dark outline-none transition
              focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-6">
        <button
          type="button"
          onClick={() => dispatch(previousStep())}
          className="text-sm font-medium text-gray-600 hover:text-brand-dark"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-2 rounded-md bg-brand-primary px-5 py-2.5
            text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          <Download size={16} />
          Download
        </button>
      </div>
    </div>
  );
};

export default DonePage;
