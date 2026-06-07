import { useDispatch, useSelector } from "react-redux";

import { updateResume } from "@/redux/slices/resumeSlice";
import RepeatableSection from "../forms/ui/RepeatableSection";

const NEW_PUBLICATION = { title: "", publisher: "", year: "", url: "" };

const FIELDS = [
  { name: "title", label: "Title" },
  { name: "publisher", label: "Publisher", half: true },
  { name: "year", label: "Year", half: true },
  { name: "url", label: "URL" },
];

const PublicationsAccordion = () => {
  const dispatch = useDispatch();
  const publications =
    useSelector((state) => state.resume.currentResume.publications) || [];

  return (
    <RepeatableSection
      bare
      entries={publications}
      onChange={(data) =>
        dispatch(updateResume({ section: "publications", data }))
      }
      newEntry={NEW_PUBLICATION}
      fields={FIELDS}
      entryLabel="Publication"
      addLabel="Add publication"
    />
  );
};

export default PublicationsAccordion;
