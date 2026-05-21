import React from "react";

import {
  Sparkles,
} from "lucide-react";

const AnalyzeButton = () => {

  return (

    <div className="
      flex
      justify-center
    ">

      <button className="
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

        Analyze Resume

      </button>

    </div>
  );
};

export default AnalyzeButton;