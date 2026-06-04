import { useSelector } from "react-redux";

const SkillsSection = () => {

  const { skills } = useSelector(
    (state) => state.resume.currentResume
  );

  const mergedSkills = [
    ...(skills?.technical || []),
    ...(skills?.tools || []),
    ...(skills?.soft || []),
  ];

  const previewSkills =
    mergedSkills.length > 0
      ? mergedSkills
      : [
          "React",
          "Node.js",
          "MongoDB",
          "Express.js",
          "JavaScript",
          "TypeScript",
          "Tailwind CSS",
          "Git",
          "REST APIs",
          "Problem Solving",
        ];

  return (
    <section className="mb-4">

      <h2 className="text-sm font-bold uppercase border-b pb-1 mb-2">
        Skills
      </h2>

      <div className="flex flex-wrap gap-2">

        {previewSkills.map((skill, index) => (

          <span
            key={index}
            className="
              text-[11px]
              px-2
              py-1
              rounded
              bg-gray-100
              border
              text-gray-700
            "
          >
            {skill}
          </span>

        ))}

      </div>

    </section>
  );
};

export default SkillsSection;