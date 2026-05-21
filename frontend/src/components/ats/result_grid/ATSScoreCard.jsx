import React from "react";
import { useSelector } from "react-redux";

const ATSScoreCard = () => {
  const {result} = useSelector((state)=> state.ats);
  const score = result?.score || 0;

  return (

    <div className="
      bg-white
      rounded-3xl
      p-6
      border
      shadow-sm
    ">

      <h2 className="
        text-xl
        font-bold
      ">
        ATS Match Score
      </h2>

      <div className="
        flex
        justify-center
        mt-8
      ">

        <div className="
          relative
          w-44
          h-44
          rounded-full
          border-[12px]
          border-violet-500
          flex
          items-center
          justify-center
        ">

          <div className="
            text-center
          ">

            <h1 className="
              text-5xl
              font-bold
              text-violet-600
            ">
              {score}%
            </h1>

            <p className="
              text-sm
              text-gray-500
              mt-2
            ">
              Match Score
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ATSScoreCard;