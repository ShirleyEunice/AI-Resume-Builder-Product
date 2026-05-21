import React from "react";

import {
  ArrowRight,
  Sparkles,
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
      from-violet-500
      to-fuchsia-500
      rounded-2xl
      px-6
      py-4
      text-white
      flex
      items-center
      justify-between
      gap-4
      shadow-sm
    ">

      {/* LEFT */}
      <div className="
        flex
        items-center
        gap-3
      ">

        {/* ICON */}
        <div className="
          w-10
          h-10
          rounded-xl
          bg-white/20
          flex
          items-center
          justify-center
          shrink-0
        ">

          <Sparkles
            className="
              w-5
              h-5
            "
          />

        </div>

        {/* TEXT */}
        <div>

          <h2 className="
            text-lg
            font-semibold
          ">
            Improve Resume with AI
          </h2>

          <p className="
            text-sm
            text-violet-100
            mt-1
          ">
            Apply ATS suggestions instantly
            in Resume Builder.
          </p>

        </div>

      </div>

      {/* BUTTON */}
      <button
        onClick={() =>
          navigate("/resume-builder")
        }

        className="
          bg-white
          text-violet-700
          px-4
          py-2.5
          rounded-xl
          text-sm
          font-semibold
          flex
          items-center
          gap-2
          hover:scale-105
          transition
          shrink-0
        "
      >

        Optimize

        <ArrowRight
          className="
            w-4
            h-4
          "
        />

      </button>

    </div>
  );
};

export default ImproveResumeCTA;