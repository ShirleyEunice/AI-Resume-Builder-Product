const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // Stored as a display string: "5 Mar 2023", or "Mar 2023" when day is omitted.
  // Robust parse: pulls day / month / year out regardless of which parts are present.
  const parse = (value) => {
    const tokens = (value || "").trim().split(/\s+/).filter(Boolean);
    let day = "", month = "", year = "";
    tokens.forEach((tok) => {
      const t = tok.replace(",", "");
      if (MONTHS.includes(t)) month = t;
      else if (/^\d{4}$/.test(t)) year = t;
      else if (/^\d{1,2}$/.test(t)) day = String(Number(t)); // normalize "05" -> "5"
    });
    return { day, month, year };
  };

  const DateField = ({ label, value, onChange, disabled = false }) => {
    const { day, month, year } = parse(value);

    const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
    const startYear = 1970, endYear = 2035;              // deterministic; bump endYear as needed
    const years = [];
    for (let y = endYear; y >= startYear; y--) years.push(String(y));

    // Day is optional, so any combination is allowed — empty parts just drop out.
    const emit = (d, m, y) => onChange([d, m, y].filter(Boolean).join(" "));

    const select =
      "rounded-md border border-gray-300 px-2 py-2 text-sm text-brand-dark outline-none " +
      "transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary " +
      "disabled:bg-gray-100 disabled:text-gray-400";

    return (
      <div>
        {label && (
          <label className="mb-1 block text-sm font-semibold text-brand-dark">{label}</label>
        )}
        <div className="flex gap-2">
          {/* Day — optional */}
          <select className={`${select} w-20`} disabled={disabled} value={day}
            onChange={(e) => emit(e.target.value, month, year)}>
            <option value="">Day</option>
            {days.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>

          {/* Month */}
          <select className={`${select} flex-1`} disabled={disabled} value={month}
            onChange={(e) => emit(day, e.target.value, year)}>
            <option value="">Month</option>
            {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>

          {/* Year */}
          <select className={`${select} w-24`} disabled={disabled} value={year}
            onChange={(e) => emit(day, month, e.target.value)}>
            <option value="">Year</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>
    );
  };

  export default DateField;