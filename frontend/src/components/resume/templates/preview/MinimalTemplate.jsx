import React from "react";

import {
  useSelector,
} from "react-redux";

import TemplateWrapper
from "./TemplateWrapper";

const MinimalTemplate = () => {

  const resume =
    useSelector(
      (state) =>
        state.resume.currentResume
    );

  const info =
    resume.personalInfo;

  return (

    <TemplateWrapper>

      <div className="
        text-center
        border-b
        pb-6
        mb-8
      ">

        <h1 className="
          text-4xl
          font-light
        ">

          {
            info.fullName ||
            "Your Name"
          }

        </h1>

        <p className="
          mt-2
          text-gray-500
        ">

          {info.headLine}

        </p>

      </div>

      <section>

        <h2 className="
          uppercase
          tracking-widest
          text-sm
          text-gray-500
          mb-4
        ">

          Summary

        </h2>

        <p>

          {
            info.summary ||
            "Minimal professional summary"
          }

        </p>

      </section>

    </TemplateWrapper>
  );
};

export default MinimalTemplate;