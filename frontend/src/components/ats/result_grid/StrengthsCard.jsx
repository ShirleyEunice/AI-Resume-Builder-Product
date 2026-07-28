import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useSelector } from "react-redux";

const StrengthsCard = () => {
  const { result } = useSelector((state) => state.ats);
  const strengths = result?.strengths || [];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden h-full">
      {/* Header */}
      <div className="p-5 text-white" style={{ background: "linear-gradient(135deg, #14B8A6, #10B981)" }}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold">Resume Strengths</h2>
            <p className="text-white/80 text-xs mt-0.5">Strong matching areas identified by AI</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {strengths.length ? (
          <div className="space-y-1">
            {strengths.map((item, i) => (
              <div
                key={i}
                className="relative pl-8 pb-5 last:pb-0 border-l-2 border-green-100 last:border-transparent"
              >
                <div className="absolute -left-[11px] top-0.5 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                <p className="text-sm leading-relaxed text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">AI strengths will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default StrengthsCard;
