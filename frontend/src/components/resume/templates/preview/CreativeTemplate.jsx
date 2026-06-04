import React from "react";
import { useSelector } from "react-redux";

import TemplateWrapper from "./TemplateWrapper";

const CreativeTemplate = () => {

  const resume = useSelector(
    (state) => state.resume.currentResume
  );

  const {
    personalInfo,
    skills,
    experience,
    education,
    projects,
  } = resume;

  const previewInfo = {

    fullName:
      personalInfo.fullName ||
      "Jennifer Jobscan",

    headLine:
      personalInfo.headLine ||
      "Creative Product Manager",

    email:
      personalInfo.email ||
      "jennifer@resume.com",

    phone:
      personalInfo.phone ||
      "(123) 456-7890",

    location:
      personalInfo.location ||
      "Seattle, WA",

    linkedin:
      personalInfo.linkedin ||
      "linkedin.com/in/jennifer",

    summary:
      personalInfo.summary ||
      "Creative and detail-oriented professional passionate about building innovative products and delivering exceptional user experiences.",
  };

  const mergedSkills = [
    ...(skills?.technical || []),
    ...(skills?.tools || []),
    ...(skills?.soft || []),
  ];

  const previewSkills =
    mergedSkills.length
      ? mergedSkills
      : [
          "React",
          "Node.js",
          "MongoDB",
          "Figma",
          "Product Strategy",
        ];

  return (

    <TemplateWrapper>

      <div className="flex min-h-full">

        {/* SIDEBAR */}

        <div
          className="
            w-[30%]
            bg-violet-700
            text-white
            p-4
          "
        >

          <div
            className="
              w-16
              h-16
              rounded-full
              bg-violet-500
              mx-auto
              mb-4
            "
          />

          <h1
            className="
              text-lg
              font-bold
              text-center
            "
          >
            {previewInfo.fullName}
          </h1>

          <p
            className="
              text-center
              text-[11px]
              text-violet-200
              mt-1
            "
          >
            {previewInfo.headLine}
          </p>

          {/* CONTACT */}

          <div className="mt-6">

            <h2
              className="
                text-xs
                uppercase
                tracking-wider
                font-semibold
                mb-2
              "
            >
              Contact
            </h2>

            <div
              className="
                text-[11px]
                space-y-2
              "
            >

              <p>{previewInfo.email}</p>

              <p>{previewInfo.phone}</p>

              <p>{previewInfo.location}</p>

              <p>{previewInfo.linkedin}</p>

            </div>

          </div>

          {/* SKILLS */}

          <div className="mt-6">

            <h2
              className="
                text-xs
                uppercase
                tracking-wider
                font-semibold
                mb-2
              "
            >
              Skills
            </h2>

            <div
              className="
                flex
                flex-wrap
                gap-1
              "
            >

              {previewSkills.map(
                (skill, index) => (

                  <span
                    key={index}
                    className="
                      px-2
                      py-1
                      rounded-full
                      bg-violet-500
                      text-[10px]
                    "
                  >
                    {skill}
                  </span>
                )
              )}

            </div>

          </div>

        </div>

        {/* MAIN CONTENT */}

        <div
          className="
            flex-1
            p-5
          "
        >

          {/* SUMMARY */}

          <section className="mb-4">

            <h2
              className="
                text-sm
                font-bold
                text-violet-700
                mb-2
              "
            >
              About Me
            </h2>

            <p
              className="
                text-xs
                text-gray-700
              "
            >
              {previewInfo.summary}
            </p>

          </section>

          {/* EXPERIENCE */}

          <section className="mb-4">

            <h2
              className="
                text-sm
                font-bold
                text-violet-700
                mb-2
              "
            >
              Experience
            </h2>

            {(experience?.length
              ? experience
              : [{
                  jobTitle:
                    "Product Manager",
                  company:
                    "Creative Studio",
                  startDate:
                    "2022",
                  endDate:
                    "Present",
                  bullets: [
                    "Led cross-functional teams to launch products.",
                    "Improved user engagement by 35%.",
                  ],
                }]
            ).map((exp, index) => (

              <div
                key={index}
                className="
                  border-l-2
                  border-violet-500
                  pl-3
                  mb-3
                "
              >

                <h3
                  className="
                    text-xs
                    font-semibold
                  "
                >
                  {exp.jobTitle}
                </h3>

                <p
                  className="
                    text-[11px]
                    text-violet-600
                  "
                >
                  {exp.company} • {exp.startDate} - {exp.endDate}
                </p>

              </div>

            ))}

          </section>

          {/* EDUCATION */}

          <section className="mb-4">

            <h2
              className="
                text-sm
                font-bold
                text-violet-700
                mb-2
              "
            >
              Education
            </h2>

            {(education?.length
              ? education
              : [{
                  degree:
                    "Bachelor of Computer Science",
                  institution:
                    "University of Kansas",
                }]
            ).map((edu, index) => (

              <div key={index}>

                <h3
                  className="
                    text-xs
                    font-semibold
                  "
                >
                  {edu.degree}
                </h3>

                <p
                  className="
                    text-[11px]
                    text-gray-600
                  "
                >
                  {edu.institution}
                </p>

              </div>

            ))}

          </section>

          {/* PROJECTS */}

          <section>

            <h2
              className="
                text-sm
                font-bold
                text-violet-700
                mb-2
              "
            >
              Projects
            </h2>

            {(projects?.length
              ? projects
              : [{
                  title:
                    "AI Resume Builder",
                  description:
                    "Built a full-stack AI resume builder using React and OpenAI.",
                }]
            ).map((project, index) => (

              <div
                key={index}
                className="mb-2"
              >

                <h3
                  className="
                    text-xs
                    font-semibold
                  "
                >
                  {project.title}
                </h3>

                <p
                  className="
                    text-[11px]
                    text-gray-700
                  "
                >
                  {project.description}
                </p>

              </div>

            ))}

          </section>

        </div>

      </div>

    </TemplateWrapper>
  );
};

export default CreativeTemplate;