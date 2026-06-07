import TemplateWrapper from "./TemplateWrapper";
import ModernHeader from "../../preview/header/ModernHeader";
import ResumeSections from "../../preview/ResumeSections";

const ModernTemplate = () => {
  return (
    <TemplateWrapper>
      <div className="font-sans">
        <ModernHeader />
        <ResumeSections variant="modern" />
      </div>
    </TemplateWrapper>
  );
};

export default ModernTemplate;
