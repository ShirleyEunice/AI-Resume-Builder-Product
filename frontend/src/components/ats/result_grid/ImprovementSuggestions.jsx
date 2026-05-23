import React from "react";

import {
  Lightbulb,
} from "lucide-react";

import {
  useSelector,
} from "react-redux";

const ImprovementSuggestions = () => {

  const { result } =
    useSelector(
      (state) => state.ats
    );

  const suggestions =
    result?.suggestions || [];

  return (

    <div className="
      bg-white
      rounded-3xl
      border
      shadow-sm
      overflow-hidden
    ">

      {/* HEADER */}
      <div className="
        bg-gradient-to-r
        from-amber-500
        to-orange-500
        p-5
        text-white
      ">

        <div className="
          flex
          items-center
          gap-3
        ">

          <div className="
            w-11
            h-11
            rounded-2xl
            bg-white/20
            flex
            items-center
            justify-center
          ">

            <Lightbulb
              className="
                w-5
                h-5
              "
            />

          </div>

          <div>

            <h2 className="
              text-xl
              font-bold
            ">
              AI Suggestions
            </h2>

            <p className="
              text-orange-100
              text-xs
              mt-1
            ">
              Actionable resume improvements
            </p>

          </div>

        </div>

      </div>

      {/* CONTENT */}
      <div className="
        p-5
        space-y-3
      ">

        {
          suggestions.length > 0
          ? suggestions.map(
            (item, i) => (

            <div
              key={i}

              className="
                flex
                items-start
                gap-3
                bg-orange-50
                border
                border-orange-100
                rounded-2xl
                px-4
                py-3
              "
            >

              {/* DOT */}
              <div className="
                mt-2
                w-2
                h-2
                rounded-full
                bg-orange-500
                shrink-0
              " />

              {/* TEXT */}
              <p className="
                text-xs
                text-orange-900
                leading-relaxed
              ">
                {item}
              </p>

            </div>
          ))
          : (

            <p className="
              text-gray-500
            ">
              AI suggestions will appear here.
            </p>
          )
        }

      </div>

    </div>
  );
};

export default ImprovementSuggestions;