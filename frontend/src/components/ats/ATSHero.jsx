import React from "react";
import { Sparkles } from "lucide-react";

const ATSHero = () => {
  return (
    <div
      className="relative overflow-hidden rounded-3xl px-6 py-7 md:px-10 md:py-9 text-white shadow-brand"
      style={{ background: "radial-gradient(120% 140% at 0% 0%, #123449 0%, #0B1220 55%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-16 right-16 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "rgba(20,184,166,0.22)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative z-10">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium text-brand-aqua border border-white/10 mb-4"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-sand" /> AI-powered analysis
        </div>

        <h1 className="font-display text-3xl md:text-[2.5rem] font-semibold leading-tight">
          ATS Resume Analyzer
        </h1>
        <p className="mt-3 text-slate-300 max-w-2xl text-sm leading-relaxed">
          Upload your resume and compare it against a job description to get an ATS score,
          keyword matches, and actionable optimization insights.
        </p>
      </div>
    </div>
  );
};

export default ATSHero;
