const PreviewHeader = ({ personalInfo }) => {
  return (
    <div className="border-b pb-6">

      <h1 className="text-4xl font-bold tracking-tight">
        {personalInfo.fullName || "Your Name"}
      </h1>

      <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">

        <p>
          {personalInfo.email || "email@example.com"}
        </p>

        <p>
          {personalInfo.phone || "+91 9876543210"}
        </p>

        <p>
          {personalInfo.location || "Location"}
        </p>

      </div>

      <div className="flex flex-wrap gap-4 mt-2 text-sm text-blue-600">

        {personalInfo.linkedin && (
          <p>{personalInfo.linkedin}</p>
        )}

        {personalInfo.github && (
          <p>{personalInfo.github}</p>
        )}

        {personalInfo.portfolio && (
          <p>{personalInfo.portfolio}</p>
        )}

      </div>

    </div>
  );
};

export default PreviewHeader;