import { getResumes } from "@/services/resumeService";
import { startInterviewSession } from "@/services/interviewService";
import {
  Briefcase,
  CheckCircle2,
  FileText,
  Loader2,
  MessageSquare,
  Star,
  Upload,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const MODES = [
  {
    key: "interview",
    title: "Mock Interview",
    desc: "A recruiter-style interview, one question at a time, with feedback on every answer.",
    icon: Briefcase,
  },
  {
    key: "coach",
    title: "Ask a Coach",
    desc: "Free-form Q&A. Ask anything — technical concepts, STAR help, resume wording, salary tips.",
    icon: MessageSquare,
  },
];

const InterviewSetup = ({ onStarted, initialResumeId = null }) => {
  const [mode, setMode] = useState("interview");
  const [resumes, setResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [selectedResumeId, setSelectedResumeId] = useState(initialResumeId);
  const [uploadFile, setUploadFile] = useState(null);
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [starting, setStarting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getResumes({
          page: 1,
          limit: 50,
          sort: "updatedAt",
          order: "desc",
          search: "",
        });
        setResumes(data.resumes || []);
      } catch (e) {
        setResumes([]);
      } finally {
        setLoadingResumes(false);
      }
    };
    load();
  }, []);

  const pickExisting = (id) => {
    setSelectedResumeId(id);
    setUploadFile(null);
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadFile(file);
    setSelectedResumeId(null);
  };

  const canStart = (selectedResumeId || uploadFile) && !starting;

  const handleStart = async () => {
    if (!selectedResumeId && !uploadFile) {
      toast.error("Select a resume or upload one to start.");
      return;
    }
    try {
      setStarting(true);
      const data = await startInterviewSession({
        mode,
        resumeId: selectedResumeId || undefined,
        file: uploadFile || undefined,
        targetRole: targetRole.trim() || undefined,
        jobDescription: jobDescription.trim() || undefined,
      });
      onStarted(data);
    } catch (error) {
      const msg =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Could not start the session.";
      toast.error(msg);
    } finally {
      setStarting(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-brand-cloud p-6">
      <div className="max-w-3xl mx-auto space-y-6 pb-10">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-ink">
            Interview Chat
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Practice with a resume-aware interviewer, or ask a coach anything.
          </p>
        </div>

        {/* Step 1 — mode */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-brand-ink">1. Choose a mode</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {MODES.map((m) => {
              const Icon = m.icon;
              const active = mode === m.key;
              return (
                <button
                  key={m.key}
                  onClick={() => setMode(m.key)}
                  className={`text-left rounded-2xl border p-5 transition ${
                    active
                      ? "border-brand-primary bg-brand-primary/5 shadow-brand"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      active
                        ? "bg-brand-primary text-white"
                        : "bg-brand-primary/10 text-brand-primary"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-3 font-semibold text-brand-ink">{m.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{m.desc}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 2 — resume */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-brand-ink">
              2. Select a resume
            </h2>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium hover:bg-gray-50 transition"
            >
              <Upload className="w-4 h-4" /> Upload PDF
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFile}
              className="hidden"
            />
          </div>

          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
            {uploadFile && (
              <div className="w-full flex items-center gap-3 rounded-2xl border border-brand-primary bg-brand-primary/5 p-4">
                <FileText className="w-5 h-5 text-brand-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-brand-ink truncate">
                    {uploadFile.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    New upload — will be saved to Resume Manager
                  </p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
              </div>
            )}

            {loadingResumes && (
              <p className="text-sm text-gray-400">Loading resumes…</p>
            )}

            {!loadingResumes && resumes.length === 0 && !uploadFile && (
              <p className="text-sm text-gray-400">
                No saved resumes. Upload a PDF to get started.
              </p>
            )}

            {resumes.map((r) => {
              const selected = selectedResumeId === r._id;
              return (
                <button
                  key={r._id}
                  onClick={() => pickExisting(r._id)}
                  className={`w-full text-left flex items-center gap-3 rounded-2xl border p-4 transition ${
                    selected
                      ? "border-brand-primary bg-brand-primary/5"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  <Star
                    className="w-5 h-5 text-brand-accent shrink-0"
                    fill="currentColor"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-brand-ink truncate">
                      {r.title || "Untitled Resume"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {r.personalInfo?.jobTitle || "Resume"}
                    </p>
                  </div>
                  {selected ? (
                    <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                  ) : (
                    <span className="w-5 h-5 rounded-full border border-gray-300 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 3 — optional targeting */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-brand-ink">
            3. Target a job{" "}
            <span className="font-normal text-gray-400">(optional)</span>
          </h2>
          <input
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="Target role, e.g. Senior React Developer"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-primary/25 focus:border-brand-primary"
          />
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste a job description to make questions target the resume↔JD gap…"
            rows={5}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none resize-y focus:ring-2 focus:ring-brand-primary/25 focus:border-brand-primary"
          />
        </section>

        <div className="flex justify-end">
          <button
            onClick={handleStart}
            disabled={!canStart}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-brand hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {starting && <Loader2 className="w-4 h-4 animate-spin" />}
            {starting
              ? "Starting…"
              : mode === "interview"
                ? "Start Interview"
                : "Start Coaching"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewSetup;
