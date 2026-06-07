import { useSelector } from "react-redux";
import { Check } from "lucide-react";

const steps = ["Profile", "Experience", "Education", "Additional", "Done"];

const WizardStepper = () => {
  const wizardStep = useSelector((state) => state.resume.wizardStep);

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const completed = wizardStep > stepNumber;
        const active = wizardStep === stepNumber;
        const isLast = index === steps.length - 1;

        return (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition
                  ${
                    completed
                      ? "border-brand-primary bg-brand-primary text-white"
                      : active
                        ? "border-brand-primary bg-brand-primary text-white"
                        : "border-gray-300 bg-white text-gray-400"
                  }`}
              >
                {completed ? <Check size={16} /> : stepNumber}
              </div>

              <p
                className={`mt-1.5 text-xs font-medium ${
                  active || completed ? "text-brand-dark" : "text-gray-400"
                }`}
              >
                {step}
              </p>
            </div>

            {!isLast && (
              <div
                className={`mx-2 mb-5 h-[2px] flex-1 ${
                  completed ? "bg-brand-primary" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WizardStepper;
