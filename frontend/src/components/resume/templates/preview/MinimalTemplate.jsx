import TemplateWrapper from "./TemplateWrapper";
import MinimalHeader from "../../preview/header/MinimalHeader";
import ResumeSections from "../../preview/ResumeSections";

const MinimalTemplate = () => {
  return (
    <TemplateWrapper>
      <div className="font-sans font-light">
        <MinimalHeader />

        <div className="mt-6">
          <ResumeSections variant="minimal" />
        </div>
      </div>
    </TemplateWrapper>
  );
};

export default MinimalTemplate;
