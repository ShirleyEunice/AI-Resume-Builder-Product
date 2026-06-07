import { useDispatch, useSelector } from "react-redux";

import { updateResume } from "@/redux/slices/resumeSlice";
import RepeatableSection from "../forms/ui/RepeatableSection";
import TagInput from "../forms/ui/TagInput";

const NEW_PROJECT = { title: "", link: "", techStack: [], description: "" };

const FIELDS = [
  { name: "title", label: "Title", half: true },
  { name: "link", label: "Link", half: true },
  { name: "description", label: "Description", textarea: true, rows: 3 },
];

const ProjectsAccordion = () => {
  const dispatch = useDispatch();
  const projects =
    useSelector((state) => state.resume.currentResume.projects) || [];

  const save = (data) => dispatch(updateResume({ section: "projects", data }));

  const renderExtra = (entry, index) => (
    <TagInput
      label="Tech Stack"
      items={entry.techStack || []}
      onChange={(items) => {
        const next = projects.map((p, i) =>
          i === index ? { ...p, techStack: items } : p,
        );
        save(next);
      }}
      placeholder="Add a technology..."
      hint="Press enter to add"
    />
  );

  return (
    <RepeatableSection
      bare
      entries={projects}
      onChange={save}
      newEntry={NEW_PROJECT}
      fields={FIELDS}
      entryLabel="Project"
      addLabel="Add project"
      renderExtra={renderExtra}
    />
  );
};

export default ProjectsAccordion;
