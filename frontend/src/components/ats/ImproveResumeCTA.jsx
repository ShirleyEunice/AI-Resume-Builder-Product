import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ImproveResumeCTA = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative overflow-hidden rounded-3xl px-6 py-5 text-white flex items-center justify-between gap-4 shadow-brand"
      style={{ background: "radial-gradient(120% 140% at 0% 0%, #123449 0%, #0B1220 60%)" }}
    >
      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-2xl" style={{ background: "rgba(20,184,166,0.2)" }} />

      {/* Left */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-brand-aqua" />
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold">Improve your resume with AI</h2>
          <p className="text-xs text-slate-300 mt-0.5">Apply these ATS suggestions in the Resume Builder.</p>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => navigate("/resume/start")}
        className="relative z-10 bg-brand-primary hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shrink-0"
      >
        Optimize
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ImproveResumeCTA;
