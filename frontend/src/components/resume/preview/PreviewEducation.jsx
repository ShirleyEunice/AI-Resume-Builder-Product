const PreviewEducation = ({ education }) => {
  if (!education?.length) return null;

  return (
    <div className="mt-10">

      <h2 className="text-xl font-semibold border-b pb-2 mb-4">
        Education
      </h2>

      {education.map((edu, index) => (
        <div key={index} className="mb-5">

          <div className="flex justify-between">

            <div>

              <h3 className="font-bold">
                {edu.degree}
              </h3>

              <p className="text-gray-700">
                {edu.institution}
              </p>

            </div>

            <p className="text-sm text-gray-500">

              {edu.startDate} - {edu.endDate}

            </p>

          </div>

          <p className="text-gray-600 mt-1">
            {edu.field}
          </p>

        </div>
      ))}

    </div>
  );
};

export default PreviewEducation;