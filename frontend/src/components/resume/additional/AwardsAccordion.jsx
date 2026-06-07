import { useDispatch, useSelector } from "react-redux";

import { updateResume } from "@/redux/slices/resumeSlice";
import RepeatableSection from "../forms/ui/RepeatableSection";

const NEW_AWARD = { title: "", issuer: "", year: "" };

const FIELDS = [
  { name: "title", label: "Title" },
  { name: "issuer", label: "Issuer", half: true },
  { name: "year", label: "Year", half: true },
];

const AwardsAccordion = () => {
  const dispatch = useDispatch();
  const awards =
    useSelector((state) => state.resume.currentResume.awards) || [];

  return (
    <RepeatableSection
      bare
      entries={awards}
      onChange={(data) => dispatch(updateResume({ section: "awards", data }))}
      newEntry={NEW_AWARD}
      fields={FIELDS}
      entryLabel="Award"
      addLabel="Add award"
    />
  );
};

export default AwardsAccordion;
