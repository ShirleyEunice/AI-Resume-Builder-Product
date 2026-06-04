import { useSelector } from "react-redux";

const ModernHeader = () => {

  const { personalInfo } = useSelector(
    (state) => state.resume.currentResume
  );

  return (
    <div className="border-b pb-3 mb-4">
      <h1 className="text-2xl font-bold text-gray-900">
        {personalInfo.fullName || "Jennifer"}
      </h1>

      <p className="text-sm text-violet-600 font-medium mt-1">
        {personalInfo.headLine || "Product Manager"}
      </p>

      <div className="flex flex-wrap gap-3 mt-2 text-[11px] text-gray-600">
        <span>{personalInfo.email || "jennifer@resume.com"}</span>

        <span>{personalInfo.phone || "(123) 456-7890"}</span>

        <span>{personalInfo.location || "Seattle, WA"}</span>

        <span>{personalInfo.linkedin || "linkedin.com/in/jennifer"}</span>

        <span>{personalInfo.github || "github.com/jennifer"}</span>
      </div>
    </div>
  );
};

export default ModernHeader;