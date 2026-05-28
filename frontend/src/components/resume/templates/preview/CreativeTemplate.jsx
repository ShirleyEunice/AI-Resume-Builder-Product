import React from "react";

import {
  useSelector,
} from "react-redux";

import TemplateWrapper
from "./TemplateWrapper";

const CreativeTemplate = () => {

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
        flex
        min-h-[1000px]
      ">

        {/* SIDEBAR */}

        <div className="
          w-[32%]
          bg-violet-700
          text-white
          p-8
        ">

          <div className="
            w-28
            h-28
            rounded-full
            bg-violet-500
            mx-auto
            mb-8
          " />

          <h1 className="
            text-3xl
            font-bold
            text-center
          ">

            {
              info.fullName ||
              "Your Name"
            }

          </h1>

          <p className="
            text-center
            mt-2
            text-violet-200
          ">

            {
              info.headLine ||
              "Creative Designer"
            }

          </p>

          {/* CONTACT */}

          <div className="mt-12">

            <h2 className="
              uppercase
              tracking-widest
              text-sm
              font-semibold
              mb-4
            ">

              Contact

            </h2>

            <div className="
              space-y-3
              text-sm
            ">

              <p>{info.email}</p>

              <p>{info.phone}</p>

              <p>{info.location}</p>

              <p>{info.linkedin}</p>

            </div>

          </div>

          {/* SKILLS */}

          <div className="mt-12">

            <h2 className="
              uppercase
              tracking-widest
              text-sm
              font-semibold
              mb-4
            ">

              Skills

            </h2>

            <div className="
              flex
              flex-wrap
              gap-2
            ">

              <span className="
                px-3
                py-1
                rounded-full
                bg-violet-500
                text-xs
              ">
                React
              </span>

              <span className="
                px-3
                py-1
                rounded-full
                bg-violet-500
                text-xs
              ">
                Node.js
              </span>

              <span className="
                px-3
                py-1
                rounded-full
                bg-violet-500
                text-xs
              ">
                MongoDB
              </span>

            </div>

          </div>

        </div>

        {/* MAIN CONTENT */}

        <div className="
          flex-1
          p-10
        ">

          {/* SUMMARY */}

          <section className="mb-10">

            <h2 className="
              text-3xl
              font-bold
              text-violet-700
              mb-4
            ">

              About Me

            </h2>

            <p className="
              text-gray-700
              leading-relaxed
            ">

              {
                info.summary ||
                "Creative and detail-oriented professional passionate about building engaging digital experiences."
              }

            </p>

          </section>

          {/* EXPERIENCE */}

          <section className="mb-10">

            <h2 className="
              text-3xl
              font-bold
              text-violet-700
              mb-6
            ">

              Experience

            </h2>

            <div className="
              border-l-4
              border-violet-500
              pl-6
              space-y-8
            ">

              <div>

                <h3 className="
                  text-xl
                  font-bold
                ">

                  UI/UX Designer

                </h3>

                <p className="
                  text-violet-600
                  mt-1
                ">

                  Creative Studio • 2022 - Present

                </p>

                <p className="
                  mt-3
                  text-gray-700
                ">

                  Designed engaging user experiences and collaborated with developers to launch scalable products.

                </p>

              </div>

              <div>

                <h3 className="
                  text-xl
                  font-bold
                ">

                  Frontend Developer

                </h3>

                <p className="
                  text-violet-600
                  mt-1
                ">

                  Startup Inc • 2020 - 2022

                </p>

                <p className="
                  mt-3
                  text-gray-700
                ">

                  Developed responsive web interfaces using React and Tailwind CSS.

                </p>

              </div>

            </div>

          </section>

          {/* EDUCATION */}

          <section>

            <h2 className="
              text-3xl
              font-bold
              text-violet-700
              mb-4
            ">

              Education

            </h2>

            <div>

              <h3 className="
                text-xl
                font-bold
              ">

                Bachelor of Computer Science

              </h3>

              <p className="
                text-violet-600
                mt-1
              ">

                XYZ University • 2018 - 2022

              </p>

            </div>

          </section>

        </div>

      </div>

    </TemplateWrapper>
  );
};

export default CreativeTemplate;