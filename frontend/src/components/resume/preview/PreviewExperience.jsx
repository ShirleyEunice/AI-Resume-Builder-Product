import React from 'react'

const PreviewExperience = ({experience}) => {
  return (
<div className="mt-10">

  <h2 className="text-xl font-semibold border-b pb-2 mb-5">
    Experience
  </h2>

  {
    experience?.map(
      (exp, index) => (
        <div
          key={index}
          className="mb-8"
        >

          <div className="flex justify-between items-start">

            <div>

              <h3 className="text-lg font-bold">
                {exp.role || "Role"}
              </h3>

              <p className="text-gray-700 font-medium">
                {exp.company || "Company"}
              </p>

            </div>

            <p className="text-sm text-gray-500">

              {exp.startDate}
              {" — "}

              {
                exp.current
                  ? "Present"
                  : exp.endDate
              }

            </p>

          </div>

          <ul className="mt-4 space-y-2 ml-5 list-disc">

            {
              exp.description?.map(
                (bullet, i) => (
                  <li
                    key={i}
                    className="
                      text-gray-700
                      leading-7
                    "
                  >
                    {bullet}
                  </li>
                )
              )
            }

          </ul>

        </div>
      )
    )
  }

</div>
  )
}

export default PreviewExperience