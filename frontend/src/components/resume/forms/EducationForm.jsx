import { useDispatch, useSelector } from "react-redux";
import DynamicSection from "./DynamicSection";
import { updateEducation } from "@/redux/slices/resumeSlice";

const EducationForm = () => {
  const dispatch = useDispatch();

  const education =
    useSelector(
      (state) => state.resume.currentResume.education
    ) || [];

  const addEducation = () => {
    dispatch(
      updateEducation([
        ...education,
        {
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
        },
      ])
    );
  };

  const removeEducation = (index) => {
    dispatch(
      updateEducation(
        education.filter((_, i) => i !== index)
      )
    );
  };

  const handleChange = (
    index,
    field,
    value
  ) => {
    const updated = education.map((item, i) =>
  i === index
    ? { ...item, [field]: value }
    : item
);

    dispatch(updateEducation(updated));
  };

  return (
    <DynamicSection
      title="Education"
      items={education}
      onAdd={addEducation}
      onRemove={removeEducation}
      onChange={handleChange}
      fields={[
        {
          name: "institution",
          label: "Institution",
        },
        {
          name: "degree",
          label: "Degree",
        },
        {
          name: "field",
          label: "Field",
        },
        {
          name: "startDate",
          label: "Start Date",
        },
        {
          name: "endDate",
          label: "End Date",
        },
      ]}
    />
  );
};

export default EducationForm;