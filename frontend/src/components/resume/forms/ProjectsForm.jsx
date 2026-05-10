import { useDispatch, useSelector } from "react-redux";
import DynamicSection from "./DynamicSection";
import { updateProjects } from "@/redux/slices/resumeSlice";

const ProjectsForm = () => {
  const dispatch = useDispatch();

  const projects =
    useSelector(
      (state) => state.resume.currentResume.projects
    ) || [];

  const addProject = () => {
    dispatch(
      updateProjects([
        ...projects,
        {
          title: "",
          techStack: "",
          link: "",
          description: "",
        },
      ])
    );
  };

  const removeProject = (index) => {
    dispatch(
      updateProjects(
        projects.filter((_, i) => i !== index)
      )
    );
  };

  const handleChange = (
    index,
    field,
    value
  ) => {
    const updated = projects.map((item, i) =>
  i === index
    ? { ...item, [field]: value }
    : item
);

    dispatch(updateProjects(updated));
  };

  return (
    <DynamicSection
      title="Projects"
      items={projects}
      onAdd={addProject}
      onRemove={removeProject}
      onChange={handleChange}
      fields={[
        {
          name: "title",
          label: "Project Title",
        },
        {
          name: "techStack",
          label: "Tech Stack",
        },
        {
          name: "link",
          label: "Project Link",
        },
        {
          name: "description",
          label: "Description",
        },
      ]}
    />
  );
};

export default ProjectsForm;