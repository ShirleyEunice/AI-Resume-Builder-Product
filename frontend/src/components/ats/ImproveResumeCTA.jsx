import React from "react";

import {
  ArrowRight,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

const ImproveResumeCTA = () => {

  const navigate =
    useNavigate();

  return (

    <div className="
      bg-gradient-to-r
      from-violet-600
      to-indigo-600
      rounded-3xl
      p-8
      text-white
      flex
      flex-col
      lg:flex-row
      items-center
      justify-between
      gap-6
    ">

      <div>

        <h2 className="
          text-3xl
          font-bold
        ">
          Improve Your Resume
        </h2>

        <p className="
          mt-3
          text-violet-100
          max-w-2xl
        ">
          Open Resume Builder and apply AI-powered
          optimization suggestions instantly.
        </p>

      </div>

      <button
        onClick={() =>
          navigate("/resume-builder")
        }

        className="
          bg-white
          text-violet-700
          px-6
          py-4
          rounded-2xl
          font-semibold
          flex
          items-center
          gap-2
          hover:scale-105
          transition
        "
      >

        Improve Resume

        <ArrowRight />

      </button>

    </div>
  );
};

export default ImproveResumeCTA;