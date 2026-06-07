import { useDispatch, useSelector } from "react-redux";

import { updateResume } from "@/redux/slices/resumeSlice";

import StepHeader from "./ui/StepHeader";
import TagInput from "./ui/TagInput";
import RepeatableSection from "./ui/RepeatableSection";

const NEW_EDUCATION = {
  institution: "",
  location: "",
  degreeType: "",
  areaOfStudy: "",
  startDate: "",
  endDate: "",
  gpa: "",
  url: "",
  minor: [],
  coursework: [],
};

const FIELDS = [
  { name: "institution", label: "Institution" },
  { name: "location", label: "Location", placeholder: "City, State, Country" },
  { name: "degreeType", label: "Degree type", half: true },
  { name: "areaOfStudy", label: "Area of study", half: true },
  { name: "startDate", label: "Start Date", placeholder: "MM YYYY", half: true },
  { name: "endDate", label: "End Date", placeholder: "MM YYYY", half: true },
  {
    name: "gpa",
    label: "GPA / Score",
    placeholder: "Include only if your GPA is above 3.0.",
    half: true,
  },
  { name: "url", label: "URL", half: true },
];

const EducationForm = () => {
  const dispatch = useDispatch();
  const education =
    useSelector((state) => state.resume.currentResume.education) || [];

  const save = (next) =>
    dispatch(updateResume({ section: "education", data: next }));

  const entries = education.length ? education : [{ ...NEW_EDUCATION }];

  const updateListField = (index, field, value) => {
    const next = entries.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu,
    );
    save(next);
  };

  const renderExtra = (entry, index) => (
    <div className="space-y-4">
      <TagInput
        label="Minor"
        items={entry.minor || []}
        onChange={(items) => updateListField(index, "minor", items)}
        placeholder="Add a minor..."
        hint="Press enter to add a minor"
      />

      <TagInput
        label="Relevant Coursework"
        items={entry.coursework || []}
        onChange={(items) => updateListField(index, "coursework", items)}
        placeholder="Add relevant coursework..."
        hint="Press enter to add coursework"
      />
    </div>
  );

  return (
    <div className="max-w-2xl">
      <StepHeader
        title="Tell us about your education"
        subtitle="Include every school, even if you are a current student or did not graduate"
      />

      <RepeatableSection
        entries={entries}
        onChange={save}
        newEntry={NEW_EDUCATION}
        fields={FIELDS}
        entryLabel="Education"
        addLabel="Add another education"
        renderExtra={renderExtra}
      />
    </div>
  );
};

export default EducationForm;
