import { LayoutGrid, Table2 } from "lucide-react";

// Segmented Table / Grid switch. Controlled via `view` ("table" | "grid") + `onChange`.
export default function ViewToggle({ view, onChange }) {
  const btn = (val, Icon, label) => (
    <button
      onClick={() => onChange(val)}
      title={label}
      aria-label={label}
      className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
        view === val ? "bg-white text-brand-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
      }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="inline-flex items-center gap-1 bg-gray-100 rounded-xl p-1">
      {btn("table", Table2, "Table view")}
      {btn("grid", LayoutGrid, "Grid view")}
    </div>
  );
}
