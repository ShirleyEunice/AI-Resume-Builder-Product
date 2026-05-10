import { useSelector } from "react-redux";

const ResumePreview = () => {
  const { currentResume } = useSelector((state) => state.resume);

  const personalInfo = currentResume.personalInfo || {};

  return (
    <div className="flex justify-center py-10 bg-gray-200 min-h-screen">
      {/* A4 PAPER */}
      <div
        className="
    bg-white
    w-[800px]
    min-h-[1123px]
    shadow-2xl
    rounded-sm
    scale-[0.9]
    origin-top
    px-16 py-14
    text-gray-900
  "
      >
        {/* HEADER */}
        <div className="border-b pb-6">
          <h1 className="text-4xl font-bold tracking-tight">
            {personalInfo.fullName || "Your Name"}
          </h1>

          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
            <p>{personalInfo.email || "email@example.com"}</p>

            <p>{personalInfo.phone || "+91 9876543210"}</p>

            <p>{personalInfo.location || "Location"}</p>
          </div>

          <div className="flex flex-wrap gap-4 mt-2 text-sm text-blue-600">
            {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}

            {personalInfo.github && <p>{personalInfo.github}</p>}

            {personalInfo.portfolio && <p>{personalInfo.portfolio}</p>}
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold border-b pb-2 mb-3">
            Professional Summary
          </h2>

          <p className="leading-7 text-gray-700 whitespace-pre-line">
            {personalInfo.summary || "Your professional summary appears here."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;