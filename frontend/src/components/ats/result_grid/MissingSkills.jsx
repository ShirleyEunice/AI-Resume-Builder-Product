import React from "react";
import { useSelector } from "react-redux";

const MissingSkills = () => {
  const { result } = useSelector((state) => state.ats);
  const skills = result?.missingSkills || [];

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft h-full">
      <h2 className="text-lg font-bold text-brand-ink">Missing Skills</h2>
      <p className="text-xs text-gray-500 mt-1">Keywords missing from your resume</p>

      {skills.length ? (
        <div className="flex flex-wrap gap-2.5 mt-6">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2 text-sm font-medium text-red-600"
            >
              {skill}
              <span className="text-[10px] font-semibold bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">
                HIGH
              </span>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 mt-6">
          No missing skills detected — great keyword coverage!
        </p>
      )}
    </div>
  );
};

export default MissingSkills;
