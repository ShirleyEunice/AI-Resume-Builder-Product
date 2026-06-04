import { useSelector } from "react-redux";

const SummarySection = () => {

  const { personalInfo } = useSelector(
    (state) => state.resume.currentResume
  );


  return (
    <section className="mb-4">

      <h2 className="text-sm font-bold uppercase border-b pb-1 mb-2">
        Professional Summary
      </h2>

      <p className="text-xs text-gray-700">
        {personalInfo.summary || "Motivated and detail-oriented graduate with strong communication, problem-solving, and teamwork skills. Seeking an entry-level position to contribute to organizational success while developing professional expertise."}
      </p>

    </section>
  );
};

export default SummarySection;