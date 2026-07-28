import React from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setATSError, setATSLoading, setATSResult } from "@/redux/slices/atsSlice";
import { atsAnalyzer } from "@/services/atsService";
import { useNavigate } from "react-router-dom";

const AnalyzeButton = () => {
  const dispatch = useDispatch();
  const { resumeFile, jdText, loading } = useSelector((state) => state.ats);
  const navigate = useNavigate();

  const canAnalyze = resumeFile && jdText.trim();

  const handleAnalyze = async () => {
    if (!canAnalyze) return;
    try {
      navigate("/ats/loading");
      dispatch(setATSLoading(true));
      dispatch(setATSError(null));

      const result = await atsAnalyzer(resumeFile, jdText);
      dispatch(setATSResult(result));
      navigate("/ats/results");
    } catch (error) {
      navigate("/ats");
      dispatch(setATSError(error.response?.data?.error || "Analysis Failed"));
    } finally {
      dispatch(setATSLoading(false));
    }
  };

  return (
    <button
      onClick={handleAnalyze}
      disabled={!canAnalyze || loading}
      className="bg-brand-primary hover:bg-teal-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 shadow-brand transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
      {loading ? "Analyzing…" : "Analyze Resume"}
    </button>
  );
};

export default AnalyzeButton;
