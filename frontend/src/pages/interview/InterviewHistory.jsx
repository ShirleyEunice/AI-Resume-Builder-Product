import { PageLoader } from "@/components/ui/Loader";
import { deleteChat, getChats } from "@/services/interviewService";
import {
  ArrowLeft,
  Briefcase,
  MessageSquare,
  Play,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const ModeBadge = ({ mode }) => {
  const coach = mode === "coach";
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full ${
        coach
          ? "bg-brand-sand/20 text-brand-accent"
          : "bg-brand-primary/10 text-brand-primary"
      }`}
    >
      {coach ? (
        <MessageSquare className="w-3 h-3" />
      ) : (
        <Briefcase className="w-3 h-3" />
      )}
      {coach ? "Coach" : "Interview"}
    </span>
  );
};

const InterviewHistory = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getChats();
        setSessions(data || []);
      } catch (e) {
        toast.error("Failed to load interview sessions");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteChat(id);
      setSessions((prev) => prev.filter((s) => s._id !== id));
      toast.success("Session deleted");
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  const open = (id) => navigate(`/interview-chat?chatId=${id}`);

  const filtered = sessions.filter((s) =>
    (s.title || "").toLowerCase().includes(search.toLowerCase()),
  );

  const COLS = "grid-cols-[2fr_1fr_1fr_110px]";

  return (
    <div className="h-full overflow-y-auto bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-brand-ink">
            Interview History
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {sessions.length} saved session{sessions.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          to="/interview-chat"
          className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition"
        >
          <ArrowLeft className="w-4 h-4" /> New Interview
        </Link>
      </div>

      {/* Search */}
      <div className="mt-6 flex items-center gap-3 bg-white rounded-2xl border border-gray-100 px-4 py-3 w-full max-w-md shadow-soft">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title…"
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      {loading && <PageLoader label="Loading your interview sessions…" />}

      {!loading && filtered.length === 0 && (
        <div className="mt-6 bg-white rounded-3xl p-16 border border-gray-100 text-center shadow-soft">
          <h2 className="text-2xl font-bold text-brand-ink">
            No interview sessions yet
          </h2>
          <p className="text-gray-500 mt-3">
            Start a mock interview or coaching session to see it saved here.
          </p>
          <button
            onClick={() => navigate("/interview-chat")}
            className="mt-6 px-6 py-3 bg-brand-primary text-white rounded-xl hover:bg-teal-600 transition font-medium shadow-brand"
          >
            Start an Interview
          </button>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="mt-6 bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
          <div
            className={`grid ${COLS} gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500`}
          >
            <p>Session</p>
            <p>Mode</p>
            <p>Updated</p>
            <p className="text-right">Actions</p>
          </div>

          {filtered.map((item) => (
            <div
              key={item._id}
              className={`grid ${COLS} gap-4 px-6 py-4 border-b border-gray-100 last:border-0 items-center hover:bg-brand-primary/5 transition-colors`}
            >
              <button
                onClick={() => open(item._id)}
                className="flex items-center gap-3 min-w-0 text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-brand-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-brand-ink truncate">
                    {item.title || "Untitled Session"}
                  </p>
                  {item.targetRole && (
                    <p className="text-xs text-gray-400 truncate">
                      {item.targetRole}
                    </p>
                  )}
                </div>
              </button>
              <div>
                <ModeBadge mode={item.mode} />
              </div>
              <p className="text-sm text-gray-500">
                {new Date(item.updatedAt).toLocaleDateString()}
              </p>
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => open(item._id)}
                  title="Open"
                  className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/15 transition"
                >
                  <Play className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  title="Delete"
                  className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewHistory;
