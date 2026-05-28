import { useDispatch, useSelector }
from "react-redux";

import {
  updateLayoutSettings,
} from "@/redux/slices/resumeSlice";

const options = [
  "1.0",
  "1.15",
  "1.5",
];

const SpacingSelector = () => {

  const dispatch =
    useDispatch();

  const spacing =
    useSelector(
      (state) =>
        state.resume.currentResume
          .layoutSettings.lineSpacing
    );

  return (

    <div className="
      flex
      gap-4
      mt-5
    ">

      {
        options.map((item) => (

          <button

            key={item}

            onClick={() =>
              dispatch(
                updateLayoutSettings({
                  lineSpacing: item,
                })
              )
            }

            className={`
              flex-1
              border
              rounded-2xl
              py-4
              font-semibold
              transition

              ${
                spacing === item
                  ? "border-violet-600 bg-violet-50"
                  : "bg-white"
              }
            `}
          >

            {item}

          </button>
        ))
      }

    </div>
  );
};

export default SpacingSelector;