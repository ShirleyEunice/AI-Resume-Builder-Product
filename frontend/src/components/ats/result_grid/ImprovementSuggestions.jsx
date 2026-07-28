import React from "react";
import { Lightbulb } from "lucide-react";
import { useSelector } from "react-redux";

const ImprovementSuggestions = () => {
  const { result } = useSelector((state) => state.ats);
  const suggestions = result?.suggestions || [];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
      {/* Header */}
      <div className="p-6 text-white" style={{ background: "linear-gradient(135deg, #E0A44D, #D97706)" }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/15 flex items-center justify-center">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold">AI Improvement Roadmap</h2>
            <p className="text-white/80 text-sm mt-0.5">
              Step-by-step resume optimization suggestions
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {suggestions.length ? (
          suggestions.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 bg-amber-50 border border-amber-100 rounded-2xl p-5 items-start hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-accent text-white flex items-center justify-center text-sm font-bold shrink-0">
                {i + 1}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed pt-1.5">{item}</p>
            </div>
          ))
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
              <Lightbulb className="w-7 h-7 text-brand-accent" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-gray-700">No suggestions yet</h3>
            <p className="mt-2 text-sm text-gray-500 max-w-md">
              AI-powered improvement suggestions will appear here after ATS analysis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImprovementSuggestions;
