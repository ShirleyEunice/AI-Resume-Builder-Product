import React from "react";
import { useNavigate } from "react-router-dom";
import { Crown, ArrowRight, Check } from "lucide-react";

const perks = ["Unlimited AI generations", "Advanced ATS analysis", "Priority interview coaching"];

const UpgradeBanner = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-6 text-white shadow-brand"
      style={{ background: "radial-gradient(130% 130% at 100% 0%, #123449 0%, #0B1220 60%)" }}
    >
      {/* Decoration */}
      <div className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full blur-2xl" style={{ background: "rgba(245,201,123,0.18)" }} />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center mb-5">
          <Crown className="w-6 h-6 text-brand-sand" />
        </div>

        <h2 className="font-display text-xl font-semibold leading-snug">Upgrade to Premium</h2>
        <p className="text-slate-300 mt-2 text-xs leading-relaxed">
          Unlock the most powerful AI models and remove every limit.
        </p>

        <div className="mt-4 space-y-2">
          {perks.map((perk) => (
            <div key={perk} className="flex items-center gap-2 text-xs text-slate-200">
              <Check className="w-3.5 h-3.5 text-brand-sand shrink-0" />
              {perk}
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/upgrade")}
          className="mt-6 w-full bg-brand-accent hover:bg-amber-500 text-brand-ink px-5 py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg"
        >
          Upgrade Plan
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default UpgradeBanner;
