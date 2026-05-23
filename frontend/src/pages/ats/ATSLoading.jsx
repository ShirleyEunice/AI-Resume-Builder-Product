import React, {
  useEffect,
  useState,
} from "react";

const loadingSteps = [

  "Uploading Resume...",

  "Parsing Resume PDF...",

  "Analyzing Job Description...",

  "Matching ATS Keywords...",

  "Generating AI Insights...",

  "Preparing Results...",
];

const ATSLoading = () => {

  const [step, setStep] =
    useState(0);

  useEffect(() => {

    const interval =
      setInterval(() => {

      setStep((prev) => {

        if (
          prev <
          loadingSteps.length - 1
        ) {
          return prev + 1;
        }

        return prev;
      });

    }, 1800);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <div className="
      h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-brand-dark via-slate-800
    ">

      <div className="
        bg-white
        rounded-3xl
        p-10
        w-[500px]
        shadow-2xl
        border
      ">

        {/* ANIMATION */}
        <div className="
          flex
          justify-center
        ">

          <div className="
            w-20
            h-20
            rounded-full
            border-4
            border-violet-200
            border-t-teal-600
            animate-spin
          " />

        </div>

        {/* TITLE */}
        <h1 className="
          text-3xl
          font-bold
          text-center
          mt-8
        ">

          AI ATS Analysis

        </h1>

        <p className="
          text-center
          text-gray-500
          mt-3
        ">

          Our AI is analyzing your resume
          against the job description.

        </p>

        {/* STEPS */}
        <div className="
          mt-10
          space-y-4
        ">

          {
            loadingSteps.map(
              (item, i) => (

              <div
                key={i}

                className={`
                  flex
                  items-center
                  gap-3
                  p-3
                  rounded-xl
                  transition

                  ${
                    i <= step
                    ? "bg-violet-50 text-brand-primary"
                    : "bg-gray-50 text-gray-400"
                  }
                `}
              >

                <div className={`
                  w-3
                  h-3
                  rounded-full

                  ${
                    i <= step
                    ? "bg-brand-primary"
                    : "bg-gray-300"
                  }
                `} />

                <p className="
                  text-xs
                  font-medium
                ">
                  {item}
                </p>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
};

export default ATSLoading;