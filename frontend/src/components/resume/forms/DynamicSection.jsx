import { Plus, Trash2 } from "lucide-react";

const DynamicSection = ({
  title,
  items,
  fields,
  onAdd,
  onRemove,
  onChange,
}) => {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        <button
          onClick={onAdd}
          className="
            flex items-center gap-2
            bg-blue-600 text-white
            px-4 py-2 rounded-lg
          "
        >
          <Plus size={18} />
          Add
        </button>

      </div>

      {/* ITEMS */}
      {items.map((item, index) => (
        <div
          key={index}
          className="
            bg-white
            border
            rounded-2xl
            p-6
            shadow-sm
            space-y-4
          "
        >

          {/* TOP */}
          <div className="flex justify-between items-center">

            <h2 className="font-semibold text-lg">
              {title} {index + 1}
            </h2>

            <button
              onClick={() => onRemove(index)}
              className="text-red-500"
            >
              <Trash2 size={18} />
            </button>

          </div>

          {/* FIELDS */}
          <div className="grid gap-4">

            {fields.map((field) => (
              <input
                key={field.name}
                placeholder={field.label}
                value={item[field.name] || ""}
                onChange={(e) =>
                  onChange(
                    index,
                    field.name,
                    e.target.value
                  )
                }
                className="
                  border
                  p-3
                  rounded-lg
                "
              />
            ))}

          </div>

        </div>
      ))}

    </div>
  );
};

export default DynamicSection;