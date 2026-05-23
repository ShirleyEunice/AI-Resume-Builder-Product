import ATSHero from "@/components/ats/ATSHero";
import ImproveResumeCTA from "@/components/ats/ImproveResumeCTA";
import ATSScoreCard from "@/components/ats/result_grid/ATSScoreCard";
import ATSSummaryCard from "@/components/ats/result_grid/ATSSummaryCard";
import ImprovementSuggestions from "@/components/ats/result_grid/ImprovementSuggestions";
import MissingSkills from "@/components/ats/result_grid/MissingSkills";
import StrengthsCard from "@/components/ats/result_grid/StrengthsCard";
import { setATSResult, setJDtext, setResumeFile } from "@/redux/slices/atsSlice";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ATSResults = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBack = async () => {
    dispatch(setResumeFile(null));
    dispatch(setJDtext(""));
    setATSResult(null);
    navigate("/ats");
  };
  return (
    <div className="
  h-full
  overflow-y-auto
  bg-gray-100
  p-5
    ">
      {
        /* <ArrowLeft className="my-4
    cursor-pointer
    hover:text-brand-primary
    transition" onClick={handleBack}/> */
      }

      <div className="space-y-6">

  {/* TOP ANALYSIS */}
  <div className="
    grid
    lg:grid-cols-[320px_1fr]
    gap-6
    items-stretch
  ">

    <ATSScoreCard />

    <ATSSummaryCard />

  </div>

  {/* SECONDARY ANALYSIS */}
  <div className="
    grid
    lg:grid-cols-2
    gap-6
  ">

    <MissingSkills />

    <StrengthsCard />

  </div>

  {/* ROADMAP */}
  <ImprovementSuggestions />

</div>
    </div>
  );
};

export default ATSResults;