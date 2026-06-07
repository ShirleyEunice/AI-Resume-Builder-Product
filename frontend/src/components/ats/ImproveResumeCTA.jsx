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
      from-brand-dark
via-slate-800
to-brand-primary
      rounded-2xl
      px-6
      py-4
      text-white
      flex
      items-center
      justify-between
      gap-4
      relative
overflow-hidden
shadow-[0_10px_40px_rgba(20,184,166,0.15)]
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
            text-xs
            text-teal-100
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
          navigate("/resume/start")
        }

        className="
          bg-white
          text-brand-primary
          px-4
          py-2.5
          rounded-xl
          text-xs
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