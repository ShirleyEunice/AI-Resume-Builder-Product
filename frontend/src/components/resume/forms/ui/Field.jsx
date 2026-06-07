/**
 * Uniform labeled field used across every wizard step.
 * Renders an <input> by default, or a <textarea> when `textarea` is true.
 */
const Field = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  textarea = false,
  rows = 4,
  maxLength,
  icon = null,
  hint = null,
}) => {
  const baseInput =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm " +
    "text-brand-dark placeholder-gray-400 outline-none transition " +
    "focus:border-brand-primary focus:ring-1 focus:ring-brand-primary";

  return (
    <div>
      {label && (
        <div className="mb-1 flex items-center justify-between">
          <label className="text-sm font-semibold text-brand-dark">
            {label}
          </label>

          {hint && (
            <span className="text-[11px] text-gray-400">{hint}</span>
          )}
        </div>
      )}

      {textarea ? (
        <textarea
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className={`${baseInput} resize-none`}
        />
      ) : (
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </span>
          )}

          <input
            type={type}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
            className={`${baseInput} ${icon ? "pl-9" : ""}`}
          />
        </div>
      )}
    </div>
  );
};

export default Field;
