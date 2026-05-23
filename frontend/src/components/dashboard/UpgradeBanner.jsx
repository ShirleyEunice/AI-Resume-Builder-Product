import React from "react";

import {
  Crown,
  ArrowRight,
} from "lucide-react";

const UpgradeBanner = () => {

  return (

    <div className="
      bg-gradient-to-br
     from-brand-dark
via-slate-800
to-brand-primary
      rounded-3xl
      p-6
      text-white
      overflow-hidden
      relative
      shadow-[0_10px_50px_rgba(20,184,166,0.18)]
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
        text-xl
        font-bold
        leading-snug
      ">
        Upgrade to Premium
      </h2>

      <p className="
        text-teal-100
        mt-3
        text-xs
        leading-relaxed
      ">
        Unlock GPT-4 powered resume optimization,
        unlimited ATS analysis,
        and advanced interview coaching.
      </p>

      {/* BUTTON */}
      <button className="
        mt-6
bg-brand-accent
text-white
px-5
py-3
rounded-2xl
font-semibold
flex
items-center
gap-2
hover:scale-105
hover:bg-amber-500
transition
shadow-lg
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