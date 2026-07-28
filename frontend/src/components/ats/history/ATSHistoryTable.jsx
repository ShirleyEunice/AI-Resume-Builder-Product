import React, { useEffect, useState } from "react";
import { Eye, Trash2, WandSparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteATSScan } from "@/services/atsService";
import { removeATSHistoryItem } from "@/redux/slices/atsSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PageLoader } from "@/components/ui/Loader";
import ViewToggle from "@/components/ui/ViewToggle";
import ResumePagination from "@/components/resume/manager/ResumePagination";

const PAGE_SIZE = 5;

const scoreStyle = (s) =>
  s >= 80
    ? { ring: "#16a34a", text: "text-green-700" }
    : s >= 60
    ? { ring: "#E0A44D", text: "text-amber-700" }
    : { ring: "#ef4444", text: "text-red-700" };

const ATSHistoryTable = ({ search, sortBy }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { history, historyLoading } = useSelector((state) => state.ats);
  const [view, setView] = useState("table");
  const [page, setPage] = useState(1);

  const filteredHistory = history.filter((item) =>
    item.resumeName?.toLowerCase().includes(search.toLowerCase())
  );

  const sortedHistory = [...filteredHistory].sort((a, b) => {
    if (sortBy === "latest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "highest") return b.score - a.score;
    if (sortBy === "lowest") return a.score - b.score;
    return 0;
  });

  // Reset to first page whenever the filter/sort changes
  useEffect(() => {
    setPage(1);
  }, [search, sortBy]);

  const totalPages = Math.ceil(sortedHistory.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const paged = sortedHistory.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleDelete = async (id) => {
    try {
      await deleteATSScan(id);
      dispatch(removeATSHistoryItem(id));
      toast.success("ATS scan deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (historyLoading) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100">
        <PageLoader label="Loading scan history…" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-16 border border-gray-100 text-center shadow-soft">
        <h2 className="text-2xl font-bold text-brand-ink">No ATS scans yet</h2>
        <p className="text-gray-500 mt-3">Analyze your first resume to see scan history here.</p>
      </div>
    );
  }

  const COLS = "grid-cols-[70px_1.4fr_2fr_1fr_120px]";

  const ActionButtons = ({ item }) => (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={() => navigate(`/ats/results/${item._id}`)}
        title="View"
        className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/15 transition"
      >
        <Eye className="w-4 h-4" />
      </button>
      <button
        onClick={() => navigate("/resume/start")}
        title="Improve resume"
        className="p-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition"
      >
        <WandSparkles className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleDelete(item._id)}
        title="Delete"
        className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div>
      {/* View toggle */}
      <div className="flex justify-end mb-4">
        <ViewToggle view={view} onChange={setView} />
      </div>

      {view === "table" ? (
        /* TABLE VIEW */
        <div className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
          <div className={`grid ${COLS} gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500`}>
            <p>Score</p>
            <p>Resume</p>
            <p>Summary</p>
            <p>Date</p>
            <p className="text-right">Actions</p>
          </div>

          {paged.map((item) => {
            const s = scoreStyle(item.score);
            return (
              <div
                key={item._id}
                className={`grid ${COLS} gap-4 px-6 py-4 border-b border-gray-100 last:border-0 items-center hover:bg-brand-primary/5 transition-colors`}
              >
                <div
                  className="w-11 h-11 rounded-full border-[3px] flex items-center justify-center font-bold text-sm"
                  style={{ borderColor: s.ring }}
                >
                  <span className={s.text}>{item.score}</span>
                </div>
                <p className="font-semibold text-brand-ink truncate">{item.resumeName}</p>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                  {item.summary || item.jdText?.slice(0, 90)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <ActionButtons item={item} />
              </div>
            );
          })}
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {paged.map((item) => {
            const s = scoreStyle(item.score);
            return (
              <div
                key={item._id}
                className="group bg-white rounded-3xl border border-gray-100 shadow-soft p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-14 h-14 rounded-full border-4 flex items-center justify-center font-bold"
                    style={{ borderColor: s.ring }}
                  >
                    <span className={s.text}>{item.score}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-semibold text-brand-ink mt-4 truncate">{item.resumeName}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                  {item.summary || item.jdText?.slice(0, 90)}
                </p>

                <div className="border-t border-gray-100 mt-4 pt-4">
                  <ActionButtons item={item} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ResumePagination page={safePage} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default ATSHistoryTable;
