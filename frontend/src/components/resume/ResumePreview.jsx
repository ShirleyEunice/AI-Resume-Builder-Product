import { useSelector } from "react-redux";

import PreviewHeader from "./preview/PreviewHeader";
import PreviewSummary from "./preview/PreviewSummary";
import PreviewEducation from "./preview/PreviewEducation";
import PreviewProject from "./preview/PreviewProject";
import PreviewExperience from "./preview/PreviewExperience";

const ResumePreview = () => {
  const { currentResume } = useSelector(
    (state) => state.resume
  );

  const personalInfo =
    currentResume.personalInfo || {};

  return (
    <div className="flex justify-center py-10">

      <div
        className="
          bg-white
          w-[794px]
          h-fit
          shadow-2xl
          rounded-sm
          scale-[0.8]
          origin-top
          px-16 py-14
          text-gray-900
        "
      >

        <PreviewHeader personalInfo={personalInfo} />

        <PreviewSummary
          summary={personalInfo.summary}
        />

        <PreviewEducation
          education={currentResume.education}
        />

        <PreviewExperience
        experience={currentResume.experience}/>

        <PreviewProject
          projects={currentResume.projects}
        />

      </div>

    </div>
  );
};

export default ResumePreview;