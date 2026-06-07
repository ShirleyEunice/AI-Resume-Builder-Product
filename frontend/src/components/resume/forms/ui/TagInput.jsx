import { useState } from "react";
import { X } from "lucide-react";

/**
 * Chip-style input. Type a value and press Enter to add it to the list.
 * `items` is an array of strings; `onChange` receives the new array.
 */
const TagInput = ({
  label,
  items = [],
  onChange,
  placeholder = "Type and press enter...",
  hint = "Press enter to add",
}) => {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const value = draft.trim();
    if (!value) return;
    if (items.includes(value)) {
      setDraft("");
      return;
    }
    onChange([...items, value]);
    setDraft("");
  };

  const removeTag = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      {label && (
        <label className="mb-1 block text-sm font-semibold text-brand-dark">
          {label}
        </label>
      )}

      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
          text-brand-dark placeholder-gray-400 outline-none transition
          focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
      />

      {hint && <p className="mt-1 text-[11px] text-gray-400">{hint}</p>}

      {items.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={index}
              className="flex items-center gap-1 rounded-full bg-brand-primary/10
                px-3 py-1 text-xs font-medium text-brand-primary"
            >
              {item}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="hover:text-brand-dark"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
