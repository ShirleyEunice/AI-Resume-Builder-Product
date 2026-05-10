import {
  User,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Wrench,
  Award,
  CheckCircle2,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { setActiveSection } from "@/redux/slices/resumeSlice";

const sections = [
  {
    key: "personalInfo",
    label: "Personal Info",
    icon: User,
  },
  {
    key: "experience",
    label: "Experience",
    icon: Briefcase,
  },
  {
    key: "education",
    label: "Education",
    icon: GraduationCap,
  },
  {
    key: "projects",
    label: "Projects",
    icon: FolderKanban,
  },
  {
    key: "skills",
    label: "Skills",
    icon: Wrench,
  },
  {
    key: "certifications",
    label: "Certifications",
    icon: Award,
  },
];

const ResumeSidebar = () => {
  const dispatch = useDispatch();

  const { activeSection, currentResume } = useSelector(
    (state) => state.resume
  );

  // SIMPLE COMPLETION CHECK
  const isCompleted = (sectionKey) => {
    const section = currentResume[sectionKey];

    if (!section) return false;

    if (Array.isArray(section)) {
      return section.length > 0;
    }

    return Object.values(section).some(Boolean);
  };

  return (
    <div className="h-full flex flex-col">

      {/* HEADER */}
      <div className="p-6 border-b bg-white">

        <h2 className="text-2xl font-bold">
          Resume Builder
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Complete your resume
        </p>

      </div>

      {/* PROGRESS */}
      <div className="px-6 py-4 bg-white border-b">

        <div className="flex justify-between text-sm mb-2">

          <span className="font-medium">
            Completion
          </span>

          <span className="text-blue-600 font-semibold">
            65%
          </span>

        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

          <div className="h-full w-[65%] bg-blue-600 rounded-full" />

        </div>

      </div>

      {/* NAVIGATION */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">

        <div className="space-y-2">

          {sections.map((section) => {
            const Icon = section.icon;

            const active =
              activeSection === section.key;

            const completed = isCompleted(section.key);

            return (
              <button
                key={section.key}
                onClick={() =>
                  dispatch(setActiveSection(section.key))
                }
                className={`
                  w-full
                  flex items-center justify-between
                  px-4 py-3 rounded-xl
                  transition-all duration-200
                  group
                  ${
                    active
                      ? "bg-blue-600 text-white shadow-md"
                      : "hover:bg-gray-100"
                  }
                `}
              >

                {/* LEFT */}
                <div className="flex items-center gap-3">

                  <Icon size={18} />

                  <span className="font-medium">
                    {section.label}
                  </span>

                </div>

                {/* RIGHT */}
                {completed && (
                  <CheckCircle2
                    size={18}
                    className={
                      active
                        ? "text-white"
                        : "text-green-500"
                    }
                  />
                )}

              </button>
            );
          })}

        </div>

      </div>

    </div>
  );
};

export default ResumeSidebar;