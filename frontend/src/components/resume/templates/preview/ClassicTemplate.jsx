import { useSelector } from "react-redux";
import TemplateWrapper from "./TemplateWrapper";
import ClassicHeader from "../../preview/header/ClassicHeader";
import ResumeSections from "../../preview/ResumeSections";

const ClassicTemplate = () => {
  const accentColor = useSelector(
    (state) => state.resume.currentResume.layoutSettings?.accentColor || "#0d9488"
  );

  return (
    <TemplateWrapper>
      <div className="font-serif">
        <div className="mb-4 border-b-2 pb-3" style={{ borderColor: accentColor }}>
          <ClassicHeader />
        </div>

        <ResumeSections variant="classic" />
      </div>
    </TemplateWrapper>
  );
};

export default ClassicTemplate;
