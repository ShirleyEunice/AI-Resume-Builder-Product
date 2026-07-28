import React from "react";
import { useSelector } from "react-redux";

const ATSScoreCard = () => {
  const { result } = useSelector((state) => state.ats);
  const score = Math.min(100, Math.max(0, result?.score || 0));

  const r = 70;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - score / 100);

  const { color, label } =
    score >= 80
      ? { color: "#16a34a", label: "Excellent match" }
      : score >= 60
      ? { color: "#E0A44D", label: "Good match" }
      : { color: "#ef4444", label: "Needs work" };

  return (
    <div className="bg-white rounded-3xl p-8 h-full flex flex-col items-center justify-center border border-gray-100 shadow-soft">
      <h2 className="text-lg font-bold text-brand-ink self-start">ATS Match Score</h2>

      <div className="relative mt-6" style={{ width: 180, height: 180 }}>
        <svg width="180" height="180" className="-rotate-90">
          <circle cx="90" cy="90" r={r} fill="none" stroke="#f1f5f9" strokeWidth="14" />
          <circle
            cx="90"
            cy="90"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-5xl font-semibold text-brand-ink">
            {score}
            <span className="text-2xl">%</span>
          </span>
          <span className="text-xs text-gray-500 mt-1">Match Score</span>
        </div>
      </div>

      <span
        className="mt-6 text-sm font-semibold px-4 py-1.5 rounded-full"
        style={{ color, background: `${color}1a` }}
      >
        {label}
      </span>
    </div>
  );
};

export default ATSScoreCard;
