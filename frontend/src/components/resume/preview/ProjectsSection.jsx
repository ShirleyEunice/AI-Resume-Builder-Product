import { useSelector } from "react-redux";

const ProjectsSection = () => {

  const { projects } = useSelector(
    (state) => state.resume.currentResume
  );

  const previewProjects =
    projects?.length
      ? projects
      : [
          {
            title: "AI Resume Builder",
            description:
              "Built a full-stack AI-powered resume builder using React, Node.js, Express, MongoDB, Redux Toolkit, and OpenAI APIs.",
          },
          {
            title: "ATS Resume Analyzer",
            description:
              "Developed an AI-driven ATS analyzer that compares resumes against job descriptions and provides optimization suggestions.",
          },
        ];

  return (
    <section className="mb-4">

      <h2 className="text-sm font-bold uppercase border-b pb-1 mb-2">
        Projects
      </h2>

      {previewProjects.map((project, index) => (

        <div
          key={index}
          className="mb-3"
        >

          <h3 className="text-xs font-semibold">
            {project.title}
          </h3>

          <p className="text-xs text-gray-700 mt-1">
            {project.description}
          </p>

        </div>

      ))}

    </section>
  );
};

export default ProjectsSection;