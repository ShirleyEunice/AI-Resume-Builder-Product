import { Plus, X } from "lucide-react";

/**
 * Editable list of links (array of strings). Used for the Website field
 * with an "Add Link" affordance, matching the Profile design.
 */
const LinkList = ({ label, items = [], onChange, addLabel = "Add Link" }) => {
  const addLink = () => onChange([...items, ""]);

  const updateLink = (index, value) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const removeLink = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      {label && (
        <label className="mb-1 block text-sm font-semibold text-brand-dark">
          {label}
        </label>
      )}

      {items.length > 0 && (
        <div className="mb-2 space-y-2">
          {items.map((link, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                value={link}
                onChange={(e) => updateLink(index, e.target.value)}
                placeholder="https://your-website.com"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                  text-brand-dark placeholder-gray-400 outline-none transition
                  focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              />
              <button
                type="button"
                onClick={() => removeLink(index)}
                className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={addLink}
        className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline"
      >
        <Plus size={16} />
        {addLabel}
      </button>
    </div>
  );
};

export default LinkList;
