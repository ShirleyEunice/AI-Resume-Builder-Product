 import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { Download, FileCheck2, Star, Loader2, CheckCircle2, Mail } from "lucide-react";
  import toast from "react-hot-toast";
  import { previousStep, setResumeTitle } from "@/redux/slices/resumeSlice";

  const DonePage = ({ onDownload }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const title = useSelector((state) => state.resume.currentResume.title);
    const userEmail = useSelector((state) => state.auth.user?.email);
    const [status, setStatus] = useState("idle");

    const handleNameChange = (e) => dispatch(setResumeTitle(e.target.value));

    const handleDownload = async () => {
      if (status === "loading") return;
      setStatus("loading");
      try {
        await onDownload();
        setStatus("done");
        toast.success(`PDF downloaded & sent to ${userEmail}!`);
        // setTimeout(() => navigate("/dashboard"), 2000);
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong. Please try again.");
        setStatus("idle");
      }
    };

    return (
      <div className="flex flex-col items-center py-8 sm:py-10 text-center px-4">
        <div className="mb-5 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-brand-primary/10">
          <FileCheck2 size={40} className="text-brand-primary" />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-brand-dark">
          You've finished creating your resume 🙌
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-gray-500 max-w-xs">
          Download your resume — a copy will also be sent to your email
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-100 px-4 py-2.5 text-xs sm:text-sm text-blue-700">
          <Mail size={14} className="shrink-0" />
          <span>Will be sent to <strong>{userEmail}</strong></span>
        </div>

        <div className="mt-6 w-full max-w-sm text-left">
          <label className="mb-1 block text-sm font-semibold text-brand-dark">
            Give your resume a name
          </label>
          <div className="relative">
            <Star size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={title || ""}
              onChange={handleNameChange}
              placeholder="My Resume"
              className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm
                text-brand-dark outline-none transition
                focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
            />
          </div>
        </div>

        <div className="mt-6 flex w-full max-w-sm items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => dispatch(previousStep())}
            disabled={status === "loading"}
            className="text-sm font-medium text-gray-500 hover:text-brand-dark disabled:opacity-40"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={status !== "idle"}
            className="flex items-center gap-2 rounded-md bg-brand-primary px-6 py-2.5
              text-sm font-semibold text-white transition hover:opacity-90
              disabled:opacity-60 min-w-[160px] justify-center"
          >
            {status === "loading" && <Loader2 size={15} className="animate-spin" />}
            {status === "done"    && <CheckCircle2 size={15} />}
            {status === "idle"    && <Download size={15} />}
            {status === "loading" ? "Generating…" : status === "done" ? "Done!" : "Download & Send"}
          </button>
        </div>

        {status === "loading" && (
          <p className="mt-3 text-xs text-gray-400 animate-pulse">
            Capturing your resume — this may take a few seconds…
          </p>
        )}
      </div>
    );
  };

  export default DonePage;