import { setResumeText, setSelectedResumeId } from "@/redux/slices/coverLetterSlice";
import { getResumes } from "@/services/resumeService";
import { parseResume } from "@/services/coverLetterService";
import { CheckCircle2, FileText, Loader2, Star, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const ResumeSelector = () => {
  const dispatch = useDispatch();
  const { selectedResumeId, resumeText } = useSelector((state) => state.coverLetter);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadedName, setUploadedName] = useState("");
  const [parsing, setParsing] = useState(false);
  const [uploadError, setUploadError] = useState("");
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
        setLoading(false);
      }
    };
    load();
  }, []);

  const selectExisting = (id) => {
    dispatch(setSelectedResumeId(id));
    dispatch(setResumeText(""));
    setUploadedName("");
    setUploadError("");
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-uploading the same file
    if (!file) return;
    try {
      setParsing(true);
      setUploadError("");
      const data = await parseResume(file);
      dispatch(setResumeText(data.resumeText));
      dispatch(setSelectedResumeId(null));
      setUploadedName(file.name);
    } catch (err) {
      setUploadError(err.response?.data?.error || "Could not read this PDF");
      setUploadedName("");
    } finally {
      setParsing(false);
    }
  };

  const uploadSelected = !selectedResumeId && !!resumeText && !!uploadedName;

  return (
    <div className="bg-white rounded-3xl p-6 border shadow-sm h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Step 1: Select a resume</h2>
          <p className="text-xs text-gray-500 mt-1">Choose an existing resume or upload a PDF</p>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={parsing}
          className="flex items-center gap-2 rounded-2xl border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50"
        >
          {parsing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {parsing ? "Reading…" : "Upload"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      {uploadError && <p className="text-xs text-red-600 mt-3">{uploadError}</p>}

      <div className="mt-5 space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {uploadSelected && (
          <div className="w-full flex items-center gap-3 rounded-2xl border border-brand-primary bg-brand-primary/5 p-4">
            <FileText className="w-5 h-5 text-brand-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{uploadedName}</p>
              <p className="text-xs text-gray-400 mt-0.5">Uploaded just now</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
          </div>
        )}

        {loading && <p className="text-sm text-gray-400">Loading resumes…</p>}

        {!loading && resumes.length === 0 && !uploadSelected && (
          <p className="text-sm text-gray-400">
            No resumes found. Upload a PDF or create one in Resume Builder.
          </p>
        )}

        {resumes.map((r) => {
          const selected = selectedResumeId === r._id;
          return (
            <button
              key={r._id}
              onClick={() => selectExisting(r._id)}
              className={`w-full text-left flex items-center gap-3 rounded-2xl border p-4 transition ${
                selected
                  ? "border-brand-primary bg-brand-primary/5"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Star className="w-5 h-5 text-brand-accent shrink-0" fill="currentColor" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {r.title || "Untitled Resume"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Saved {formatDate(r.updatedAt)}</p>
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
    </div>
  );
};

export default ResumeSelector;
