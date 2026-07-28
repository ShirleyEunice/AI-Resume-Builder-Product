import { setJDtext } from "@/redux/slices/atsSlice";
import { FileText, Link2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const JDInput = () => {
  const [activeTab, setActiveTab] = useState("paste");
  const { jdText } = useSelector((state) => state.ats);
  const dispatch = useDispatch();

  const tabClass = (tab) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
      activeTab === tab
        ? "bg-brand-primary text-white"
        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
    }`;

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft h-full">
      <h2 className="text-lg font-bold text-brand-ink">Job Description</h2>
      <p className="text-xs text-gray-500 mt-1">Paste the job description or import via job URL</p>

      {/* Tabs */}
      <div className="mt-6 flex gap-3">
        <button onClick={() => setActiveTab("paste")} className={tabClass("paste")}>
          <FileText className="w-4 h-4" /> Paste JD
        </button>
        <button onClick={() => setActiveTab("url")} className={tabClass("url")}>
          <Link2 className="w-4 h-4" /> Job URL
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "paste" ? (
          <textarea
            placeholder="Paste the complete job description here..."
            value={jdText}
            onChange={(e) => dispatch(setJDtext(e.target.value))}
            className="w-full h-[260px] border border-gray-200 rounded-2xl p-4 text-sm outline-none resize-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
          />
        ) : (
          <div>
            <input
              type="text"
              value={jdText}
              onChange={(e) => dispatch(setJDtext(e.target.value))}
              placeholder="https://company.com/careers/job-posting"
              className="w-full border border-gray-200 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
            />
            <div className="mt-5 bg-brand-primary/5 border border-brand-primary/15 rounded-2xl p-4">
              <p className="text-xs text-brand-primary leading-relaxed">
                Supported platforms: LinkedIn Jobs, Greenhouse, Lever, Workday, Indeed, and company
                career pages.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JDInput;
