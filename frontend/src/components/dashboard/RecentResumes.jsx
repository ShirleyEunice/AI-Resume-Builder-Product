import { div, title } from "framer-motion/client";
import { Download, FileText, Pencil } from "lucide-react";
import React from "react";

const resumes = [
  {
    title: "Frontend Developer Resume",
    ats: 84,
    updated: "2 hours ago",
  },

  {
    title: "Fullstack Resume",
    ats: 76,
    updated: "Yesterday",
  },

  {
    title: "AI Engineer Resume",
    ats: 91,
    updated: "3 days ago",
  },
];

const RecentResumes = () => {
  return (
    <div className="bg-white rounded-3xl px-4 py-3 shadow-sm border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Recent Resumes</h2>
          <p className="text-xs text-gray-500 mt-1">
            Continue editing your resumes
          </p>
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {resumes.map((resume, i) => (
          <div
            key={i}
            className="
                  flex
                  items-center
                  justify-between
                  border
                  rounded-2xl
                  p-4
                  hover:bg-gray-50
                  transition
                "
          >
            {/* LEFT */}
            <div
              className="
                  flex
                  items-center
                  gap-4
                "
            >
              <div
                className="
                    w-12
                    h-12
                    rounded-xl
                    bg-brand-primary/20
                    flex
                    items-center
                    justify-center
                  "
              >
                <FileText
                  className="
                        text-brand-primary
                      "
                />
              </div>

              <div>
                <h3
                  className="
                      font-semibold
                    "
                >
                  {resume.title}
                </h3>

                <p
                  className="
                      text-xs
                      text-gray-500
                    "
                >
                  ATS Score:
                  <span
                    className="
                        text-green-600
                        font-medium
                        ml-1
                      "
                  >
                    {resume.ats}%
                  </span>
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div
              className="
                  flex
                  items-center
                  gap-4
                "
            >
              <p
                className="
                    text-xs
                    text-gray-400
                  "
              >
                {resume.updated}
              </p>

              <button
                className="
                    p-2
                    rounded-lg
                    hover:bg-white/10
                  "
              >
                <Pencil
                  className="
                        w-4
                        h-4
                      "
                />
              </button>

              <button
                className="
                    p-2
                    rounded-lg
                    hover:bg-white/10
                  "
              >
                <Download
                  className="
                        w-4
                        h-4
                      "
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentResumes;
