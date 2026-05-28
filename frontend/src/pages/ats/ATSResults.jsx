import ATSHero from "@/components/ats/ATSHero";
import ImproveResumeCTA from "@/components/ats/ImproveResumeCTA";
import ATSScoreCard from "@/components/ats/result_grid/ATSScoreCard";
import ATSSummaryCard from "@/components/ats/result_grid/ATSSummaryCard";
import ImprovementSuggestions from "@/components/ats/result_grid/ImprovementSuggestions";
import MissingSkills from "@/components/ats/result_grid/MissingSkills";
import StrengthsCard from "@/components/ats/result_grid/StrengthsCard";
import { setATSResult, setJDtext, setResumeFile } from "@/redux/slices/atsSlice";
import { getATSById } from "@/services/atsService";
import { ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ATSResults = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  const {result} = useSelector((state)=> state.ats);

  useEffect(()=>{
    const fetchResult = async ()=>{
      try {
        const data = await getATSById(id);
        dispatch(setATSResult(data));
      } catch (error) {
        console.error(error);
      }
    }
    if(id){
      fetchResult();
    }
  }, [id])

  const handleBack = async () => {
    dispatch(setResumeFile(null));
    dispatch(setJDtext(""));
    setATSResult(null);
    navigate("/ats");
  };

  if (!result) {

  return (

    <div className="
      h-screen
      flex
      items-center
      justify-center
    ">

      <div className="
        text-center
      ">

        <div className="
          w-14
          h-14
          border-4
          border-violet-200
          border-t-violet-600
          rounded-full
          animate-spin
          mx-auto
        " />

        <p className="
          mt-5
          text-gray-500
        ">

          Loading ATS Results...

        </p>

      </div>

    </div>
  );
}
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