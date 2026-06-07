import { useDispatch, useSelector } from "react-redux";

import { updateResume } from "@/redux/slices/resumeSlice";
import RepeatableSection from "../forms/ui/RepeatableSection";

const NEW_LANGUAGE = { name: "", proficiency: "" };

const FIELDS = [
  { name: "name", label: "Language", half: true },
  {
    name: "proficiency",
    label: "Proficiency",
    placeholder: "e.g. Native, Fluent, Intermediate",
    half: true,
  },
];

const LanguagesAccordion = () => {
  const dispatch = useDispatch();
  const languages =
    useSelector((state) => state.resume.currentResume.languages) || [];

  return (
    <RepeatableSection
      bare
      entries={languages}
      onChange={(data) => dispatch(updateResume({ section: "languages", data }))}
      newEntry={NEW_LANGUAGE}
      fields={FIELDS}
      entryLabel="Language"
      addLabel="Add language"
    />
  );
};

export default LanguagesAccordion;
