import AnalyzeButton from "@/components/ats/AnalyzeButton";
import ATSHero from "@/components/ats/ATSHero";
import JDInput from "@/components/ats/JDInput";
import ResumeUploader from "@/components/ats/ResumeUploader";
import { resetATSState } from "@/redux/slices/atsSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const ATSAnalyzer = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(resetATSState());
  }, [])
  return (
    <div
      className="
  h-full
  overflow-y-auto
  bg-gray-100
  p-5
"
    >
      <div
        className="
    space-y-5
    pb-10
  "
      >
        <ATSHero />

        <div
          className="
      grid
      lg:grid-cols-2
      gap-5 items-start
    "
        >
          <ResumeUploader />

          <JDInput />
        </div>

        <div
          className="
  sticky
  top-4
  z-20
  flex
  justify-center
"
        >
          <AnalyzeButton />
        </div>
      </div>
    </div>
  );
};

export default ATSAnalyzer;
