import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  updateResume,
} from "@/redux/slices/resumeSlice";

const TemplateCard = ({
  template,
  title,
  preview,
}) => {

  const dispatch =
    useDispatch();

  const selected =
    useSelector(
      (state) =>
        state.resume.currentResume
          .template
    );

  return (

    <button

      onClick={() =>
        dispatch(
          updateResume({
            section: "template",
            data: template,
          })
        )
      }

      className={`
        border
        rounded-3xl
        overflow-hidden
        bg-white
        transition-all
        duration-300
        hover:shadow-2xl
        hover:-translate-y-1
        text-left

        ${
          selected === template
            ? `
              border-violet-600
              ring-4
              ring-violet-200
              shadow-xl
            `
            : `
              border-gray-200
            `
        }
      `}
    >

      {/* TEMPLATE PREVIEW */}

      <div className="
  h-[250px]
  overflow-hidden
  bg-gray-100
  relative
  flex
  items-start
  justify-start
">

  <div className="
    scale-[0.39]
    origin-top-left
    pointer-events-none
    absolute
    top-0
    left-0
  ">

    {preview}

  </div>

</div>

      {/* FOOTER */}

      <div className="
        p-5
        border-t
        bg-white
      ">

        <div className="
          flex
          items-center
          justify-between
        ">

          <div>

            <h3 className="
              text-lg
              font-bold
              text-gray-900
            ">

              {title}

            </h3>

            <p className="
              text-sm
              text-gray-500
              mt-1
            ">

              ATS Friendly Template

            </p>

          </div>

          {/* RADIO INDICATOR */}

          <div className={`
            w-6
            h-6
            rounded-full
            border-2
            flex
            items-center
            justify-center

            ${
              selected === template
                ? "border-violet-600"
                : "border-gray-300"
            }
          `}>

            {
              selected === template && (

                <div className="
                  w-3
                  h-3
                  rounded-full
                  bg-violet-600
                " />
              )
            }

          </div>

        </div>

      </div>

    </button>
  );
};

export default TemplateCard;