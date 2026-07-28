import React from "react";
import { MessageSquare, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const chats = [
  { id: 1, title: "Frontend React Interview", preview: "Explain useMemo vs useCallback", updated: "10 minutes ago" },
  { id: 2, title: "System Design Mock", preview: "How would you scale Redis caching?", updated: "Yesterday" },
  { id: 3, title: "Behavioral Interview", preview: "Tell me about a challenge you solved", updated: "3 days ago" },
];

const RecentChats = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl p-5 shadow-soft border border-gray-100">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-brand-ink">Recent Interview Chats</h2>
        <p className="text-xs text-gray-500 mt-1">Continue your AI interview prep</p>
      </div>

      {/* List */}
      <div className="space-y-3">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => navigate(`/interview-chat/${chat.id}`)}
            className="w-full border border-gray-100 rounded-2xl p-4 text-left hover:bg-gray-50 hover:border-brand-primary/30 transition-colors group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-4 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-brand-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-brand-ink truncate">{chat.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed truncate">{chat.preview}</p>
                  <p className="text-[11px] text-gray-400 mt-2">{chat.updated}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-brand-primary group-hover:translate-x-0.5 transition shrink-0" />
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <button
        onClick={() => navigate("/interview-chat")}
        className="mt-5 w-full border border-dashed border-gray-300 rounded-2xl py-3 text-xs font-medium text-gray-500 hover:border-brand-primary hover:text-brand-primary transition-colors"
      >
        View all chats
      </button>
    </div>
  );
};

export default RecentChats;
