import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  nextStep,
  previousStep,
} from "@/redux/slices/resumeSlice";

const WizardNavigation = () => {

  const dispatch =
    useDispatch();

  const step =
    useSelector(
      (state) =>
        state.resume.wizardStep
    );

  return (

    <div className="
      flex
      justify-between
      mt-16
    ">

      <button

        onClick={() =>
          dispatch(previousStep())
        }

        disabled={step === 1}

        className="
          px-6
          py-3
          rounded-xl
          border
        "
      >

        Back

      </button>

      <button

        onClick={() =>
          dispatch(nextStep())
        }

        disabled={step === 5}

        className="
          px-8
          py-3
          rounded-xl
          bg-violet-600
          text-white
          font-semibold
        "
      >

        Continue

      </button>

    </div>
  );
};

export default WizardNavigation;