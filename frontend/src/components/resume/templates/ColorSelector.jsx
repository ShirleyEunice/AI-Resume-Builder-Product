import { useDispatch, useSelector } from "react-redux";
import { updateLayoutSettings } from "@/redux/slices/resumeSlice";

const PALETTE = [
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
    (state) =>
      state.resume.currentResume.layoutSettings?.accentColor || "#0d9488"
  );

  const set = (value) =>
    dispatch(updateLayoutSettings({ accentColor: value }));

  const isPreset = PALETTE.some((c) => c.value === accentColor);

  return (
    <div className="mt-5 space-y-4">
      {/* Swatches */}
      <div className="flex flex-wrap gap-3">
        {PALETTE.map((color) => {
          const active = accentColor === color.value;
          return (
            <button
              key={color.value}
              title={color.label}
              onClick={() => set(color.value)}
              className="relative w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none"
              style={{ backgroundColor: color.value }}
            >
              {active && (
                <span
                  className="absolute inset-0 rounded-full ring-2 ring-offset-2"
                  style={{ ringColor: color.value, outlineColor: color.value, boxShadow: `0 0 0 2px white, 0 0 0 4px ${color.value}` }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Custom color picker */}
      <div className="flex items-center gap-3">
        <label className="relative w-8 h-8 rounded-full overflow-hidden cursor-pointer border border-gray-200 flex-shrink-0"
          style={{ backgroundColor: isPreset ? "#e5e7eb" : accentColor }}>
          <input
            type="color"
            value={accentColor}
            onChange={(e) => set(e.target.value)}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
          {/* Gradient hint so user knows it's clickable */}
          <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold select-none pointer-events-none">
            +
          </span>
        </label>
        <div>
          <p className="text-xs font-medium text-gray-700">Custom color</p>
          <p className="text-[11px] text-gray-400">{accentColor.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;
