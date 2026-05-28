import React from "react";

import {
  useSelector,
} from "react-redux";

import TemplateWrapper
from "./TemplateWrapper";

const ModernTemplate = () => {

  const resume =
    useSelector(
      (state) =>
        state.resume.currentResume
    );

  const info =
    resume.personalInfo;

  return (

    <TemplateWrapper>

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="
          text-5xl
          font-bold
          text-gray-900
        ">

          {
            info.fullName ||
            "Your Name"
          }

        </h1>

        <p className="
          text-xl
          text-violet-600
          mt-2
        ">

          {
            info.headLine ||
            "Software Engineer"
          }

        </p>

        <div className="
          flex
          gap-4
          mt-4
          text-sm
          text-gray-600
          flex-wrap
        ">

          <span>{info.email}</span>
          <span>{info.phone}</span>
          <span>{info.location}</span>

        </div>

      </div>

      {/* SUMMARY */}

      <section className="mb-8">

        <h2 className="
          text-2xl
          font-bold
          border-b
          pb-2
          mb-4
        ">

          Professional Summary

        </h2>

        <p className="
          text-gray-700
        ">

          {
            info.summary ||
            "Professional summary appears here."
          }

        </p>

      </section>

    </TemplateWrapper>
  );
};

export default ModernTemplate;