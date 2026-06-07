import { useDispatch, useSelector } from "react-redux";

import { updateResume } from "@/redux/slices/resumeSlice";
import TagInput from "../forms/ui/TagInput";

const InterestsAccordion = () => {
  const dispatch = useDispatch();
  const interests =
    useSelector((state) => state.resume.currentResume.interests) || [];

  return (
    <TagInput
      items={interests}
      onChange={(items) =>
        dispatch(updateResume({ section: "interests", data: items }))
      }
      placeholder="Add an interest..."
      hint="Press enter to add an interest"
    />
  );
};

export default InterestsAccordion;
