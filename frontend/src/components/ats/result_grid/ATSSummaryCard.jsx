import React from "react";
import { Sparkles } from "lucide-react";
import { useSelector } from "react-redux";

const ATSSummaryCard = () => {
  const { result } = useSelector((state) => state.ats);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden h-full">
      {/* Header */}
      <div
        className="p-5 text-white"
        style={{ background: "radial-gradient(120% 140% at 0% 0%, #123449 0%, #0B1220 60%)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-brand-sand" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold">AI Resume Summary</h2>
            <p className="text-slate-300 text-xs mt-0.5">AI-generated professional overview</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="bg-brand-primary/5 border border-brand-primary/10 border-l-4 border-l-brand-primary rounded-2xl p-5">
          <p className="text-gray-700 leading-relaxed text-[15px]">
            {result?.summary || "AI summary will appear here after analysis."}
          </p>
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs text-brand-primary font-medium">
          <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
          AI generated insight
        </div>
      </div>
    </div>
  );
};

export default ATSSummaryCard;
