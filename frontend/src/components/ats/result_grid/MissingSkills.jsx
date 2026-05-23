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
      shadow-sm space-y-4
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
    border
    border-red-100
    rounded-2xl
    px-4
    py-3

    flex
    items-center
    justify-between
  "
>

  <span className="
    text-sm
    font-medium
    text-red-600
  ">
    {skill}
  </span>

  <span className="
    text-[10px]
    font-semibold
    bg-red-100
    text-red-600
    px-2
    py-1
    rounded-full ms-4
  ">
    HIGH
  </span>

</div>
          ))
        }

      </div>

    </div>
  );
};

export default MissingSkills;