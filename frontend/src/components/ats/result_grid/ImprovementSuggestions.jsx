import React from "react";

const suggestions = [
  "Add measurable achievements in experience section",
  "Include cloud-related technical skills",
  "Improve keyword alignment with job description",
  "Add more ATS-friendly project descriptions",
];

const ImprovementSuggestions = () => {

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
        AI Suggestions
      </h2>

      <div className="
        mt-6
        space-y-4
      ">

        {
          suggestions.map((item, i) => (

            <div
              key={i}

              className="
                flex
                gap-4
                p-4
                rounded-2xl
                bg-violet-50
              "
            >

              <div className="
                w-2
                rounded-full
                bg-violet-600
              " />

              <p className="
                text-sm
                leading-relaxed
              ">
                {item}
              </p>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default ImprovementSuggestions;