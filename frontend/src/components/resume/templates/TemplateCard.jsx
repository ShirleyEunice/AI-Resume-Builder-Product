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
        transition
        hover:shadow-xl

        ${
          selected === template
            ? "border-violet-600 ring-2 ring-violet-200"
            : ""
        }
      `}
    >

      {/* Thumbnail */}

      <div className="
        h-72
        bg-gray-100
      ">

      </div>

      <div className="
        p-5
        font-semibold
      ">

        {title}

      </div>

    </button>
  );
};

export default TemplateCard;