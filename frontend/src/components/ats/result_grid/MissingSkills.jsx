import React from "react";
import { useSelector } from "react-redux";

const MissingSkills = () => {
  const {result} = useSelector((state)=> state.ats);
  const skills = result?.missingSkills || [];

  return (

    <div className="
      bg-white
      rounded-3xl
      p-6
      border
      shadow-sm
    ">

      <h2 className="
        text-xl
        font-bold
      ">
        Missing Skills
      </h2>

      <p className="
        text-xs
        text-gray-500
        mt-1
      ">
        Skills missing from your resume
      </p>

      <div className="
        flex
        flex-wrap
        gap-3
        mt-6
      ">

        {
          skills.map((skill, i) => (

            <div
              key={i}

              className="
                bg-red-50
                text-red-600
                border
                border-red-100
                px-4
                py-2
                rounded-full
                text-xs
                font-medium
              "
            >

              {skill}

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default MissingSkills;