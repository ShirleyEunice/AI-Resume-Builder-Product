import TemplateWrapper from "./TemplateWrapper";
import ClassicHeader from "../../preview/header/ClassicHeader";
import ResumeSections from "../../preview/ResumeSections";

const ClassicTemplate = () => {
  return (
    <TemplateWrapper>
      <div className="font-serif">
        <div className="mb-4 border-b-2 border-gray-800 pb-3">
          <ClassicHeader />
        </div>

        <ResumeSections variant="classic" />
      </div>
    </TemplateWrapper>
  );
};

export default ClassicTemplate;
