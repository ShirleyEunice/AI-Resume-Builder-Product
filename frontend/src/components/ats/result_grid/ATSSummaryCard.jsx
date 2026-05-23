import React from "react";

import {
  Sparkles,
} from "lucide-react";

import {
  useSelector,
} from "react-redux";

const ATSummaryCard = () => {

  const { result } =
    useSelector(
      (state) => state.ats
    );

  return (

    <div className="
      bg-white
      rounded-3xl
      border
      shadow-sm
      overflow-hidden
    ">

      {/* TOP HEADER */}
      <div className="
        bg-gradient-to-r
        from-brand-dark
to-brand-primary
        p-5
        text-white
      ">

        <div className="
          flex
          items-center
          gap-3
        ">

          <div className="
            w-12
            h-12
            rounded-2xl
            bg-white/20
            flex
            items-center
            justify-center
          ">

            <Sparkles />

          </div>

          <div>

            <h2 className="
              text-xl
              font-bold
            ">
              AI Resume Summary
            </h2>

            <p className="
              text-violet-100
              text-xs
              mt-1
            ">
              AI-generated professional overview
            </p>

          </div>

        </div>

      </div>

      {/* CONTENT */}
      <div className="p-6">

        <div className="
          border
          bg-brand-primary/5 border-brand-primary/10
          rounded-2xl
          p-5
        ">

          <p className="
            text-gray-700
            leading-relaxed
            text-[15px] border-l-4 border-brand-primary
          ">

            {
              result?.summary ||
              "AI summary will appear here after analysis."
            }

          </p>

        </div>

        {/* FOOTER */}
        <div className="
          mt-5
          flex
          items-center
          justify-between
        ">

          <div className="
            flex
            items-center
            gap-2
            text-xs
            text-brand-primary
            font-medium
          ">

            <div className="
              w-2
              h-2
              rounded-full
              bg-brand-primary
              animate-pulse
            " />

            AI Generated Insight

          </div>

        </div>

      </div>

    </div>
  );
};

export default ATSummaryCard;