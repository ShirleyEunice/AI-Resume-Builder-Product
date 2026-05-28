import React from "react";

import {
  useSelector,
} from "react-redux";

import TemplateWrapper
from "./TemplateWrapper";

const ClassicTemplate = () => {

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

      <div className="
        text-center
        border-b-2
        border-gray-800
        pb-5
        mb-8
      ">

        <h1 className="
          text-5xl
          font-serif
          font-bold
          text-gray-900
        ">

          {
            info.fullName ||
            "Your Name"
          }

        </h1>

        <p className="
          mt-3
          text-lg
          italic
          text-gray-700
        ">

          {
            info.headLine ||
            "Professional Title"
          }

        </p>

        <div className="
          mt-4
          text-sm
          text-gray-600
          flex
          justify-center
          gap-4
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
          font-serif
          font-bold
          text-gray-800
          mb-4
        ">

          Professional Summary

        </h2>

        <p className="
          text-gray-700
          leading-relaxed
        ">

          {
            info.summary ||
            "Experienced professional with strong technical and communication skills."
          }

        </p>

      </section>

      {/* EXPERIENCE SAMPLE */}

      <section className="mb-8">

        <h2 className="
          text-2xl
          font-serif
          font-bold
          text-gray-800
          mb-4
        ">

          Experience

        </h2>

        <div>

          <div className="
            flex
            justify-between
            items-center
          ">

            <h3 className="
              font-bold
              text-lg
            ">

              Senior Software Engineer

            </h3>

            <p className="
              text-sm
              text-gray-500
            ">

              2022 - Present

            </p>

          </div>

          <p className="
            text-gray-600
            italic
            mt-1
          ">

            ABC Technologies

          </p>

          <ul className="
            list-disc
            pl-6
            mt-4
            space-y-2
            text-gray-700
          ">

            <li>
              Developed scalable web applications using MERN stack.
            </li>

            <li>
              Improved application performance and API response times.
            </li>

            <li>
              Collaborated with cross-functional teams.
            </li>

          </ul>

        </div>

      </section>

    </TemplateWrapper>
  );
};

export default ClassicTemplate;