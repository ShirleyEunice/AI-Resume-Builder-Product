import React from "react";

const ATSScorePanel = ({
  atsData,
}) => {

  if (!atsData) return null;

  return (

    <div className="
      bg-white
      rounded-2xl
      border
      p-6
      shadow-sm
      space-y-6
    ">

      {/* SCORE */}
      <div className="text-center">

        <h2 className="
          text-lg
          font-semibold
          mb-2
        ">
          ATS Score
        </h2>

        <div className="
          text-5xl
          font-bold
          text-green-600
        ">
          {atsData.score}%
        </div>

      </div>

      {/* MATCHED */}
      <div>

        <h3 className="
          font-semibold
          mb-3
        ">
          Matched Keywords
        </h3>

        <div className="
          flex flex-wrap gap-2
        ">

          {
            atsData.matchedKeywords.map(
              (item, i) => (
                <span
                  key={i}
                  className="
                    bg-green-100
                    text-green-700
                    px-3 py-1
                    rounded-full
                    text-sm
                  "
                >
                  {item}
                </span>
              )
            )
          }

        </div>

      </div>

      {/* MISSING */}
      <div>

        <h3 className="
          font-semibold
          mb-3
        ">
          Missing Keywords
        </h3>

        <div className="
          flex flex-wrap gap-2
        ">

          {
            atsData.missingKeywords.map(
              (item, i) => (
                <span
                  key={i}
                  className="
                    bg-red-100
                    text-red-700
                    px-3 py-1
                    rounded-full
                    text-sm
                  "
                >
                  {item}
                </span>
              )
            )
          }

        </div>

      </div>

      {/* SUGGESTIONS */}
      <div>

        <h3 className="
          font-semibold
          mb-3
        ">
          Suggestions
        </h3>

        <ul className="
          list-disc
          pl-5
          space-y-2
          text-sm
        ">

          {
            atsData.suggestions.map(
              (item, i) => (
                <li key={i}>
                  {item}
                </li>
              )
            )
          }

        </ul>

      </div>

    </div>
  );
};

export default ATSScorePanel;