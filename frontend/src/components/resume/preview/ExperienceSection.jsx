import { useSelector } from "react-redux";

const ExperienceSection = () => {

  const { experience } = useSelector(
    (state) => state.resume.currentResume
  );

  const previewExperience =
    experience?.length
      ? experience
      : [
          {
            jobTitle: "Design Directory Consultant",
            company: "Fashion Forum",
            startDate: "Feb 2018",
            endDate: "Present",
            bullets: [
              "Reviewed design concepts and improved product presentation.",
              "Led regional product launches across multiple markets.",
              "Collaborated with stakeholders to deliver high-quality solutions.",
            ],
          },
        ];

  return (
    <section className="mb-4">

      <h2 className="text-sm font-bold uppercase border-b pb-1 mb-2">
        Experience
      </h2>

      {previewExperience.map((exp, index) => (

        <div
          key={index}
          className="mb-3"
        >

          <div className="flex justify-between">

            <h3 className="text-xs font-semibold">
              {exp.jobTitle}
            </h3>

            <span className="text-[11px] text-gray-500">
              {exp.startDate} - {exp.endDate}
            </span>

          </div>

          <p className="text-xs text-violet-600">
            {exp.company}
          </p>

          <ul className="list-disc ml-4 text-xs mt-1">

            {exp.bullets?.map(
              (bullet, bulletIndex) => (
                <li key={bulletIndex}>
                  {bullet}
                </li>
              )
            )}

          </ul>

        </div>

      ))}

    </section>
  );
};

export default ExperienceSection;