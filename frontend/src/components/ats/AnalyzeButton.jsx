import React from "react";

import {
  Sparkles,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setATSError, setATSLoading, setATSResult } from "@/redux/slices/atsSlice";
import { atsAnalyzer } from "@/services/atsService";
import { useNavigate } from "react-router-dom";

const AnalyzeButton = () => {
  const dispatch = useDispatch();
  const {resumeFile, jdText, loading} = useSelector((state)=> state.ats);
  const navigate = useNavigate();

  const handleAnalyze = async()=>{
    try{
      navigate("/ats/loading");
      dispatch(setATSLoading(true));
      dispatch(setATSError(null));

      const result = await atsAnalyzer(resumeFile, jdText);
      dispatch(setATSResult(result));
      navigate("/ats/results");
    }catch(error){
      navigate("/ats");
      dispatch(setATSError(error.response?.data?.error || "Analysis Failed"))
    }finally{
      dispatch(setATSLoading(false));
    }
  }

  return (

    <div className="
      flex
      justify-center
    ">

      <button 
      onClick={handleAnalyze}
      className="
        bg-violet-600
        hover:bg-violet-700
        text-white
        px-8
        py-4
        rounded-2xl
        font-semibold
        flex
        items-center
        gap-3
        shadow-lg
        transition
      ">

        <Sparkles />
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

    </div>
  );
};

export default AnalyzeButton;