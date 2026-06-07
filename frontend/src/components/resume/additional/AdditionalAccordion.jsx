import { useDispatch, useSelector } from "react-redux";

import { updateResume } from "@/redux/slices/resumeSlice";
import RepeatableSection from "../forms/ui/RepeatableSection";

const NEW_ITEM = { title: "", description: "" };

const FIELDS = [
  { name: "title", label: "Title" },
  { name: "description", label: "Description", textarea: true, rows: 3 },
];

const AdditionalAccordion = () => {
  const dispatch = useDispatch();
  const additional =
    useSelector((state) => state.resume.currentResume.additional) || [];

  return (
    <RepeatableSection
      bare
      entries={additional}
      onChange={(data) =>
        dispatch(updateResume({ section: "additional", data }))
      }
      newEntry={NEW_ITEM}
      fields={FIELDS}
      entryLabel="Item"
      addLabel="Add item"
    />
  );
};

export default AdditionalAccordion;
