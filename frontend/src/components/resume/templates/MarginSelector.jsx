import { useDispatch, useSelector }
from "react-redux";

import {
  updateLayoutSettings,
} from "@/redux/slices/resumeSlice";

const options = [
  "0.5",
  "0.75",
  "1.0",
];

const MarginSelector = () => {

  const dispatch = useDispatch();

  const margin =
    useSelector(
      (state) =>
        state.resume.currentResume
          .layoutSettings.margin
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
                  margin: item,
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
                margin === item
                  ? "border-violet-600 bg-violet-50"
                  : "bg-white"
              }
            `}
          >

            {item}"

          </button>
        ))
      }

    </div>
  );
};

export default MarginSelector;