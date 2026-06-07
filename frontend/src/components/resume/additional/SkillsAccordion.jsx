import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";

import { updateResume } from "@/redux/slices/resumeSlice";
import TagInput from "../forms/ui/TagInput";

const SkillsAccordion = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.resume.currentResume.skills) || {
    technical: [],
    soft: [],
    tools: [],
  };

  const [showCategories, setShowCategories] = useState(
    (skills.soft?.length || 0) > 0 || (skills.tools?.length || 0) > 0,
  );

  const setCategory = (key, items) =>
    dispatch(
      updateResume({ section: "skills", data: { ...skills, [key]: items } }),
    );

  return (
    <div className="space-y-4">
      <TagInput
        items={skills.technical || []}
        onChange={(items) => setCategory("technical", items)}
        placeholder="Add a skill..."
        hint="Press enter to add a skill"
      />

      {showCategories ? (
        <div className="space-y-4">
          <TagInput
            label="Soft Skills"
            items={skills.soft || []}
            onChange={(items) => setCategory("soft", items)}
            placeholder="Add a soft skill..."
            hint="Press enter to add"
          />
          <TagInput
            label="Tools"
            items={skills.tools || []}
            onChange={(items) => setCategory("tools", items)}
            placeholder="Add a tool..."
            hint="Press enter to add"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowCategories(true)}
          className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline"
        >
          <Plus size={16} />
          Add Categories
        </button>
      )}
    </div>
  );
};

export default SkillsAccordion;
