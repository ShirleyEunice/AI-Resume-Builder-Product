import { Plus, Trash2 } from "lucide-react";

const AccordionCard = ({ title, subtitle, open, onToggle, onRemove, count, children }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-sm font-semibold text-brand-dark">{title}</h3>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
          {count > 0 && (
            <span className="rounded-full bg-brand-primary/10 px-2 py-0.5 text-xs font-semibold text-brand-primary">
              {count}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {open && onRemove && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); onRemove(); } }}
              title="Remove this section"
              className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
            >
              <Trash2 size={15} />
            </span>
          )}
          <span className="text-brand-primary">
            {open
              ? <Plus size={18} className="rotate-45 transition-transform duration-150" />
              : <Plus size={18} />}
          </span>
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-100 p-4">{children}</div>
      )}
    </div>
  );
};

export default AccordionCard;
