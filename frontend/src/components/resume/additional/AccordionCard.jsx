import { Plus } from "lucide-react";

const AccordionCard = ({ title, subtitle, open, onToggle, children }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div>
          <h3 className="text-sm font-semibold text-brand-dark">{title}</h3>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>

        <span className="text-brand-primary">
          {open ? <Plus size={18} className="rotate-45 transition" /> : <Plus size={18} />}
        </span>
      </button>

      {open && (
        <div className="border-t border-gray-100 p-4">{children}</div>
      )}
    </div>
  );
};

export default AccordionCard;
