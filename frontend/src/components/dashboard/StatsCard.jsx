import React from "react";
import { useSelector } from "react-redux";
import { FileText, ScanSearch, MessageSquare, Coins } from "lucide-react";

const StatsCard = () => {
  const { user } = useSelector((state) => state.auth);

  const cards = [
    { title: "Resumes", value: "12", icon: FileText, tint: "text-brand-primary bg-brand-primary/10", hint: "3 updated this week" },
    { title: "ATS Analyses", value: "8", icon: ScanSearch, tint: "text-brand-primary bg-brand-primary/10", hint: "Avg score 82%" },
    { title: "Interview Sessions", value: "15", icon: MessageSquare, tint: "text-brand-primary bg-brand-primary/10", hint: "5 this month" },
    { title: "Credits Left", value: String(user?.credits ?? 0), icon: Coins, tint: "text-brand-accent bg-brand-accent/10", hint: user?.isPremium ? "Premium plan" : "Free plan" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow-soft border border-gray-100 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <p className="text-gray-500 text-xs font-medium">{card.title}</p>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.tint}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <h2 className="font-display text-3xl font-semibold text-brand-ink mt-3">{card.value}</h2>
            <p className="text-[11px] text-gray-400 mt-1.5">{card.hint}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCard;
