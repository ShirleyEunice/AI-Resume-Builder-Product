import React from "react";
import { useSelector } from "react-redux";
import { Zap } from "lucide-react";

const CreditUsage = () => {
  const { user } = useSelector((state) => state.auth);

  const totalCredits = 200;
  const credits = user?.credits ?? 0;
  const percentage = Math.min(100, Math.round((credits / totalCredits) * 100));

  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
          <Zap className="w-5 h-5 text-brand-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-brand-ink">Credit Usage</h2>
          <p className="text-xs text-gray-500">AI feature consumption</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-gray-500">Remaining credits</span>
          <span className="font-semibold text-brand-ink">
            {credits}/{totalCredits}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
          <div
            style={{ width: `${percentage}%`, background: "linear-gradient(90deg, #14B8A6, #2DD4BF)" }}
            className="h-full rounded-full transition-all duration-500"
          />
        </div>
        <p className="text-[11px] text-gray-400 mt-2">{percentage}% remaining</p>

        {/* Footer */}
        <div className="mt-6 bg-brand-primary/5 border border-brand-primary/15 rounded-2xl p-4">
          <p className="text-xs text-brand-primary leading-relaxed">
            Upgrade to Premium for unlimited AI generations and advanced interview coaching.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreditUsage;
