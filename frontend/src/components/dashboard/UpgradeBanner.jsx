import React from "react";

import {
  Crown,
  ArrowRight,
} from "lucide-react";

const UpgradeBanner = () => {

  return (

    <div className="
      bg-gradient-to-br
      from-violet-600
      to-indigo-600
      rounded-3xl
      p-6
      text-white
      shadow-lg
      overflow-hidden
      relative
    ">

      {/* ICON */}
      <div className="
        w-14
        h-14
        rounded-2xl
        bg-white/20
        flex
        items-center
        justify-center
        mb-5
      ">

        <Crown />

      </div>

      {/* CONTENT */}
      <h2 className="
        text-2xl
        font-bold
        leading-snug
      ">
        Upgrade to Premium
      </h2>

      <p className="
        text-violet-100
        mt-3
        text-sm
        leading-relaxed
      ">
        Unlock GPT-4 powered resume optimization,
        unlimited ATS analysis,
        and advanced interview coaching.
      </p>

      {/* BUTTON */}
      <button className="
        mt-6
        bg-white
        text-violet-700
        px-5
        py-3
        rounded-2xl
        font-semibold
        flex
        items-center
        gap-2
        hover:scale-105
        transition
      ">

        Upgrade Plan

        <ArrowRight
          className="
            w-4
            h-4
          "
        />

      </button>

      {/* DECORATION */}
      <div className="
        absolute
        -right-8
        -bottom-8
        w-32
        h-32
        bg-white/10
        rounded-full
      " />

    </div>
  );
};

export default UpgradeBanner;