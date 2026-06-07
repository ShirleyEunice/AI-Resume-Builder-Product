import { useDispatch, useSelector } from "react-redux";

import { updateResume } from "@/redux/slices/resumeSlice";
import RepeatableSection from "../forms/ui/RepeatableSection";

const NEW_VOLUNTEER = {
  organization: "",
  role: "",
  startDate: "",
  endDate: "",
  description: "",
};

const FIELDS = [
  { name: "organization", label: "Organization", half: true },
  { name: "role", label: "Role", half: true },
  { name: "startDate", label: "Start Date", type: "date", half: true },
  { name: "endDate", label: "End Date", type: "date", half: true },
  { name: "description", label: "Description", textarea: true, rows: 3 },
];

const VolunteerAccordion = () => {
  const dispatch = useDispatch();
  const volunteer =
    useSelector((state) => state.resume.currentResume.volunteer) || [];

  return (
    <RepeatableSection
      bare
      entries={volunteer}
      onChange={(data) => dispatch(updateResume({ section: "volunteer", data }))}
      newEntry={NEW_VOLUNTEER}
      fields={FIELDS}
      entryLabel="Volunteering"
      addLabel="Add volunteering"
    />
  );
};

export default VolunteerAccordion;
