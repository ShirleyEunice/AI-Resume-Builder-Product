import React from "react";

import {
  CheckCircle2,
} from "lucide-react";

import {
  useSelector,
} from "react-redux";

const StrengthsCard = () => {

  const { result } =
    useSelector(
      (state) => state.ats
    );

  const strengths =
    result?.strengths || [];

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
        from-brand-primary
to-emerald-500
        p-5
        text-white
      ">

        <div className="
          flex
          items-center
          gap-3
        ">

          <div className="
            w-12
            h-12
            rounded-2xl
            bg-white/20
            flex
            items-center
            justify-center
          ">

            <CheckCircle2 />

          </div>

          <div>

            <h2 className="
              text-xl
              font-bold
            ">
              Resume Strengths
            </h2>

            <p className="
              text-green-100
              text-xs
              mt-1
            ">
              Strong matching areas identified by AI
            </p>

          </div>

        </div>

      </div>

      {/* CONTENT */}
      <div className="
        p-6
        space-y-4
      ">

        {
          strengths.length > 0
          ? strengths.map(
            (item, i) => (

            <div
  key={i}
  className="
    relative
    pl-8
    pb-6
    border-l-2
    border-green-200
  "
>

              {/* ICON */}
              <div className="
  absolute
  -left-[11px]
  top-1

  w-5
  h-5

  rounded-full
  bg-green-500

  flex
  items-center
  justify-center
">

                <CheckCircle2
  className="
    w-3
    h-3
    text-white
  "
/>

              </div>

              {/* TEXT */}
              <div>

                <p className="
                  text-sm
leading-relaxed
text-gray-700
                ">
                  {item}
                </p>

              </div>

            </div>
          ))
          : (
            <p className="
              text-gray-500
            ">
              AI strengths will appear here.
            </p>
          )
        }

      </div>

    </div>
  );
};

export default StrengthsCard;