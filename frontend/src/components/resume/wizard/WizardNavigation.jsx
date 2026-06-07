import { useDispatch, useSelector } from "react-redux";

import { nextStep, previousStep } from "@/redux/slices/resumeSlice";

const WizardNavigation = () => {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.resume.wizardStep);

  // Step 5 (Done) renders its own Back / Download controls.
  if (step === 5) return null;

  return (
    <div className="mt-10 flex items-center justify-end gap-6">
      <button
        type="button"
        onClick={() => dispatch(previousStep())}
        disabled={step === 1}
        className="text-sm font-medium text-gray-600 transition
          hover:text-brand-dark disabled:opacity-40"
      >
        Back
      </button>

      <button
        type="button"
        onClick={() => dispatch(nextStep())}
        className="rounded-md bg-brand-primary px-6 py-2.5 text-sm font-semibold
          text-white transition hover:opacity-90"
      >
        Continue
      </button>
    </div>
  );
};

export default WizardNavigation;
