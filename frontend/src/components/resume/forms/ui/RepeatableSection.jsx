import { Plus, Trash2 } from "lucide-react";
import Field from "./Field";
import DateField from "./DateField";

/**
 * Config-driven list of repeatable entries (jobs, schools, certificates...).
 *
 * Props:
 *  - entries:    array of objects
 *  - onChange:   (nextArray) => void
 *  - newEntry:   object template used when adding a new entry
 *  - fields:     [{ name, label, placeholder, type, textarea, rows, half, maxLength }]
 *  - entryLabel: singular label, e.g. "Experience" -> "Experience 1"
 *  - addLabel:   text for the add button
 *  - renderExtra(entry, index, updateField): optional custom controls per entry
 *  - bare:       when true, drops the per-entry card chrome (used inside accordions)
 */
const RepeatableSection = ({
  entries = [],
  onChange,
  newEntry,
  fields = [],
  entryLabel = "Entry",
  addLabel = "Add",
  renderExtra,
  bare = false,
}) => {
  const addEntry = () => onChange([...entries, { ...newEntry }]);

  const removeEntry = (index) =>
    onChange(entries.filter((_, i) => i !== index));

  const updateField = (index, name, value) => {
    const next = entries.map((entry, i) =>
      i === index ? { ...entry, [name]: value } : entry,
    );
    onChange(next);
  };

  const multiple = entries.length > 1;
  // In bare (accordion) mode show a remove button even for a single entry so
  // the user can clear a section they accidentally opened without needing to
  // delete the whole section from the parent.
  const showEntryRemove = multiple || bare;

  return (
    <div className="space-y-6">
      {entries.map((entry, index) => (
        <div
          key={index}
          className={
            !multiple
              ? "space-y-4"
              : bare
                ? "space-y-4 border-t border-gray-200 pt-5 first:border-0 first:pt-0"
                : "space-y-4 rounded-lg border border-gray-200 bg-white p-5"
          }
        >
          {showEntryRemove && (
            <div className={`flex items-center ${multiple ? "justify-between" : "justify-end"}`}>
              {multiple && (
                <h3 className="text-sm font-semibold text-gray-500">
                  {entryLabel} {index + 1}
                </h3>
              )}
              <button
                type="button"
                onClick={() => removeEntry(index)}
                className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.half ? "col-span-1" : "col-span-2"}
              >
                {field.type === "date" ? (
                  <DateField
                    label={field.label}
                    value={entry[field.name]}
                    disabled={field.name === "endDate" && entry.current} // greys out End when "I currently work here"
                    onChange={(val) => updateField(index, field.name, val)}
                  />
                ) : (
                  <Field
                    label={field.label}
                    placeholder={field.placeholder}
                    type={field.type}
                    textarea={field.textarea}
                    rows={field.rows}
                    maxLength={field.maxLength}
                    value={entry[field.name]}
                    onChange={(e) =>
                      updateField(index, field.name, e.target.value)
                    }
                  />
                )}
              </div>
            ))}
          </div>

          {renderExtra &&
            renderExtra(entry, index, (name, value) =>
              updateField(index, name, value),
            )}
        </div>
      ))}

      <button
        type="button"
        onClick={addEntry}
        className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline"
      >
        <Plus size={16} />
        {addLabel}
      </button>
    </div>
  );
};

export default RepeatableSection;
