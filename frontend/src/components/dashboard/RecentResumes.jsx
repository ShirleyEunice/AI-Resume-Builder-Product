import { Download, FileText, Pencil, ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const resumes = [
  { title: "Frontend Developer Resume", ats: 84, updated: "2 hours ago" },
  { title: "Fullstack Resume", ats: 76, updated: "Yesterday" },
  { title: "AI Engineer Resume", ats: 91, updated: "3 days ago" },
];

const scoreColor = (ats) =>
  ats >= 80 ? "text-green-600" : ats >= 60 ? "text-brand-accent" : "text-red-500";

const RecentResumes = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl p-5 shadow-soft border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-brand-ink">Recent Resumes</h2>
          <p className="text-xs text-gray-500 mt-1">Continue editing your resumes</p>
        </div>
        <button
          onClick={() => navigate("/resume-manager")}
          className="text-xs font-medium text-brand-primary hover:underline"
        >
          View all
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {resumes.map((resume, i) => (
          <div
            key={i}
            className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 hover:bg-gray-50 hover:border-brand-primary/30 transition-colors"
          >
            {/* Left */}
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-brand-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-brand-ink truncate">{resume.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  ATS Score:
                  <span className={`font-semibold ml-1 ${scoreColor(resume.ats)}`}>{resume.ats}%</span>
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 shrink-0">
              <p className="hidden sm:block text-xs text-gray-400 mr-1">{resume.updated}</p>
              <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-brand-primary transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-brand-primary transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <button
        onClick={() => navigate("/resume/start")}
        className="mt-5 w-full border border-dashed border-gray-300 rounded-2xl py-3 text-xs font-medium text-gray-500 hover:border-brand-primary hover:text-brand-primary transition-colors flex items-center justify-center gap-1.5"
      >
        Create new resume <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default RecentResumes;
