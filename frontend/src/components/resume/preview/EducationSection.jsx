import { useSelector } from "react-redux";

const EducationSection = () => {

  const { education } = useSelector(
    (state) => state.resume.currentResume
  );

  const previewEducation =
    education?.length
      ? education
      : [
          {
            degree: "Bachelor of Computer Science",
            institution: "University of Kansas",
            startDate: "Aug 2006",
            endDate: "Dec 2010",
            location: "Kansas, USA",
          },
        ];

  return (
    <section className="mb-4">

      <h2 className="text-sm font-bold uppercase border-b pb-1 mb-2">
        Education
      </h2>

      {previewEducation.map((edu, index) => (

        <div
          key={index}
          className="mb-3"
        >

          <div className="flex justify-between">

            <h3 className="text-xs font-semibold">
              {edu.degree}
            </h3>

            <span className="text-[11px] text-gray-500">
              {edu.startDate} - {edu.endDate}
            </span>

          </div>

          <p className="text-xs text-violet-600">
            {edu.institution}
          </p>

          {edu.location && (
            <p className="text-[11px] text-gray-500">
              {edu.location}
            </p>
          )}

        </div>

      ))}

    </section>
  );
};

export default EducationSection;