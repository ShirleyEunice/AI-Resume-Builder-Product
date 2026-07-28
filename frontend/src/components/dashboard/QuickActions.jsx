import { ArrowRight, FileText, MessageSquare, ScanSearch, FileSignature } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Create Resume",
    description: "Build a professional AI-powered resume",
    icon: FileText,
    path: "/resume/start",
  },
  {
    title: "Analyze ATS",
    description: "Compare your resume with a job description",
    icon: ScanSearch,
    path: "/ats",
  },
  {
    title: "Interview Prep",
    description: "Practice AI-powered mock interviews",
    icon: MessageSquare,
    path: "/interview-chat",
  },
  {
    title: "Cover Letter",
    description: "Generate tailored cover letters",
    icon: FileSignature,
    path: "/cover-letter",
  },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl p-5 shadow-soft border border-gray-100">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-brand-ink">Quick Actions</h2>
        <p className="text-gray-500 text-xs mt-1">Jump into your AI workflows</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className="group border border-gray-100 rounded-2xl p-5 text-left bg-white hover:border-brand-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4 group-hover:bg-brand-primary/15 transition-colors">
                <Icon className="w-5 h-5 text-brand-primary" />
              </div>

              <h3 className="font-semibold text-brand-ink">{action.title}</h3>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{action.description}</p>

              <div className="flex justify-end mt-4">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 group-hover:text-brand-primary transition-colors">
                  Open
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
