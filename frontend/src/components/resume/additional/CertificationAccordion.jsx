import { useDispatch, useSelector } from "react-redux";

import { updateResume } from "@/redux/slices/resumeSlice";
import RepeatableSection from "../forms/ui/RepeatableSection";

const NEW_CERTIFICATE = { name: "", issuer: "", year: "", url: "" };

const FIELDS = [
  { name: "name", label: "Name", half: true },
  { name: "issuer", label: "Issuer", half: true },
  { name: "year", label: "Year", half: true },
  { name: "url", label: "URL", half: true },
];

const CertificationAccordion = () => {
  const dispatch = useDispatch();
  const certifications =
    useSelector((state) => state.resume.currentResume.certifications) || [];

  return (
    <RepeatableSection
      bare
      entries={certifications}
      onChange={(data) =>
        dispatch(updateResume({ section: "certifications", data }))
      }
      newEntry={NEW_CERTIFICATE}
      fields={FIELDS}
      entryLabel="Certificate"
      addLabel="Add certificate"
    />
  );
};

export default CertificationAccordion;
