import React from "react";

import { useSelector }
from "react-redux";
import ModernTemplate from "./templates/preview/ModernTemplate";
import MinimalTemplate from "./templates/preview/MinimalTemplate";
import ClassicTemplate from "./templates/preview/ClassicTemplate";
import CreativeTemplate from "./templates/preview/CreativeTemplate";

const ResumePreview = () => {

  const {
    template,
  } = useSelector(
    (state) =>
      state.resume.currentResume
  );

  const renderTemplate = () => {

    switch(template){

      case "modern":
        return <ModernTemplate />;

      case "minimal":
        return <MinimalTemplate />;

      case "classic":
        return <ClassicTemplate />;

      case "creative":
        return <CreativeTemplate />;

      default:
        return <ModernTemplate />;
    }
  };

  return renderTemplate();
};

export default ResumePreview;