import {
  useSelector,
} from "react-redux";

const steps = [
  "Profile",
  "Experience",
  "Education",
  "Additional",
  "Done",
];

const WizardStepper = () => {

  const wizardStep =
    useSelector(
      (state) =>
        state.resume.wizardStep
    );

  return (

    <div className="
      flex
      items-center
      justify-between ms-16
    ">

      {
        steps.map((step, index) => {

          const stepNumber =
            index + 1;

          const active =
            wizardStep >= stepNumber;

          return (

            <div
              key={step}
              className="
                flex
                items-center
                flex-1
              "
            >

              <div className="
                flex
                flex-col
                items-center
              ">

                <div className={`
                  w-10
                  h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-bold

                  ${
                    active
                    ? "bg-violet-600 text-white"
                    : "bg-gray-200 text-gray-500"
                  }
                `}>

                  {stepNumber}

                </div>

                <p className="
                  mt-2
                  text-sm
                  font-medium
                ">

                  {step}

                </p>

              </div>

              {
                index !==
                steps.length - 1 && (

                  <div className={`
                    flex-1
                    h-[2px]
                    mx-4

                    ${
                      wizardStep >
                      stepNumber
                      ? "bg-violet-600"
                      : "bg-gray-200"
                    }
                  `}/>
                )
              }

            </div>
          );
        })
      }

    </div>
  );
};

export default WizardStepper;