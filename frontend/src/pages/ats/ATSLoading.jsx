import React, { useEffect, useState } from "react";
import { Loader } from "@/components/ui/Loader";

const loadingSteps = [
  "Uploading resume...",
  "Parsing resume PDF...",
  "Analyzing job description...",
  "Matching ATS keywords...",
  "Generating AI insights...",
  "Preparing results...",
];

const ATSLoading = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-full min-h-screen flex items-center justify-center p-5"
      style={{ background: "radial-gradient(130% 130% at 0% 0%, #123449 0%, #0B1220 60%)" }}
    >
      <div className="bg-white rounded-3xl p-10 w-full max-w-[480px] shadow-2xl border border-gray-100 animate-cf-fade-up">
        <div className="flex justify-center">
          <Loader size="lg" />
        </div>

        <h1 className="font-display text-3xl font-semibold text-center text-brand-ink mt-8">
          Analyzing your resume
        </h1>
        <p className="text-center text-gray-500 mt-3 text-sm">
          Our AI is matching your resume against the job description.
        </p>

        <div className="mt-9 space-y-2.5">
          {loadingSteps.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                i <= step ? "bg-brand-primary/10 text-brand-primary" : "bg-gray-50 text-gray-400"
              }`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full ${i <= step ? "bg-brand-primary" : "bg-gray-300"}`}
              />
              <p className="text-xs font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ATSLoading;
