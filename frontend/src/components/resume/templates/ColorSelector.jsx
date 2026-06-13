import { useDispatch, useSelector } from "react-redux";
import { updateLayoutSettings } from "@/redux/slices/resumeSlice";

const PRESETS = [
  { label: "Teal",     value: "#0d9488" },
  { label: "Navy",     value: "#1e40af" },
  { label: "Indigo",   value: "#4f46e5" },
  { label: "Purple",   value: "#7c3aed" },
  { label: "Rose",     value: "#e11d48" },
  { label: "Amber",    value: "#d97706" },
  { label: "Emerald",  value: "#059669" },
  { label: "Forest",   value: "#166534" },
  { label: "Slate",    value: "#475569" },
  { label: "Charcoal", value: "#374151" },
];

const ColorSelector = () => {
  const dispatch = useDispatch();
  const accentColor = useSelector(
    (state) => state.resume.currentResume.layoutSettings?.accentColor || "#0d9488"
  );

  const set = (value) => dispatch(updateLayoutSettings({ accentColor: value }));

  return (
    <div className="flex flex-wrap items-center gap-2">
      {PRESETS.map((p) => (
        <button
          key={p.value}
          type="button"
          title={p.label}
          onClick={() => set(p.value)}
          className="h-7 w-7 rounded-full border-2 transition-transform hover:scale-110"
          style={{
            backgroundColor: p.value,
            borderColor: accentColor === p.value ? "#111" : "transparent",
            outline: accentColor === p.value ? "2px solid #fff" : "none",
            outlineOffset: "-3px",
          }}
        />
      ))}

      <label
        title="Custom color"
        className="relative h-7 w-7 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-gray-300 hover:border-gray-500 transition-colors"
        style={{
          background:
            "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
        }}
      >
        <input
          type="color"
          value={accentColor}
          onChange={(e) => set(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>
    </div>
  );
};

export default ColorSelector;
