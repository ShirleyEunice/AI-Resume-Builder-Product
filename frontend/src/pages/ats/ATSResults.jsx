import ImproveResumeCTA from "@/components/ats/ImproveResumeCTA";
import ATSScoreCard from "@/components/ats/result_grid/ATSScoreCard";
import ATSSummaryCard from "@/components/ats/result_grid/ATSSummaryCard";
import ImprovementSuggestions from "@/components/ats/result_grid/ImprovementSuggestions";
import MissingSkills from "@/components/ats/result_grid/MissingSkills";
import StrengthsCard from "@/components/ats/result_grid/StrengthsCard";
import { PageLoader } from "@/components/ui/Loader";
import { setATSResult, setJDtext, setResumeFile } from "@/redux/slices/atsSlice";
import { getATSById } from "@/services/atsService";
import { ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ATSResults = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { result } = useSelector((state) => state.ats);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const data = await getATSById(id);
        dispatch(setATSResult(data));
      } catch (error) {
        console.error(error);
      }
    };
    if (id) fetchResult();
  }, [id]);

  const handleBack = () => {
    dispatch(setResumeFile(null));
    dispatch(setJDtext(""));
    dispatch(setATSResult(null));
    navigate("/ats");
  };

  if (!result) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <PageLoader label="Loading ATS results…" />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-100 p-5">
      <div className="space-y-6 pb-10">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-brand-ink">Analysis Results</h1>
            <p className="text-sm text-gray-500 mt-1">
              How your resume scores against the job description.
            </p>
          </div>
          <button
            onClick={handleBack}
            className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition shrink-0"
          >
            <ArrowLeft className="w-4 h-4" /> New analysis
          </button>
        </div>

        {/* Top analysis */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-6 items-stretch">
          <ATSScoreCard />
          <ATSSummaryCard />
        </div>

        {/* Secondary analysis */}
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <MissingSkills />
          <StrengthsCard />
        </div>

        {/* Roadmap */}
        <ImprovementSuggestions />

        {/* CTA */}
        <ImproveResumeCTA />
      </div>
    </div>
  );
};

export default ATSResults;
