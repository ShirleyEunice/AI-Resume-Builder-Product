import { removeHistoryItem, setHistory, setHistoryLoading } from "@/redux/slices/coverLetterSlice";
import { deleteCoverLetter, getCoverLetterHistory } from "@/services/coverLetterService";
import { ArrowLeft, Check, Copy, Eye, FileText, Search, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { PageLoader } from "@/components/ui/Loader";
import ViewToggle from "@/components/ui/ViewToggle";

const ToneBadge = ({ tone }) => (
  <span className="text-[11px] font-medium capitalize px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
    {tone}
  </span>
);

const CoverLetterHistory = () => {
  const dispatch = useDispatch();
  const { history, historyLoading } = useSelector((state) => state.coverLetter);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("table");
  const [active, setActive] = useState(null); // letter shown in the modal
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        dispatch(setHistoryLoading(true));
        const data = await getCoverLetterHistory();
        dispatch(setHistory(data));
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setHistoryLoading(false));
      }
    };
    fetchHistory();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      dispatch(removeHistoryItem(id));
      if (active?._id === id) setActive(null);
      toast.success("Cover letter deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleCopy = async () => {
    if (!active?.content) return;
    await navigator.clipboard.writeText(active.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filtered = history.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  const COLS = "grid-cols-[2fr_1fr_1fr_90px]";

  const RowActions = ({ item }) => (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={() => setActive(item)}
        title="View"
        className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/15 transition"
      >
        <Eye className="w-4 h-4" />
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
    <div className="h-full overflow-y-auto bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-brand-ink">Cover Letter History</h1>
          <p className="text-sm text-gray-500 mt-1">{history.length} saved cover letters</p>
        </div>
        <Link
          to="/cover-letter"
          className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition"
        >
          <ArrowLeft className="w-4 h-4" /> New Cover Letter
        </Link>
      </div>

      {/* Search + view toggle */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 px-4 py-3 w-full max-w-md shadow-soft">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title…"
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
        <ViewToggle view={view} onChange={setView} />
      </div>

      {/* Loading */}
      {historyLoading && <PageLoader label="Loading your cover letters…" />}

      {/* Empty */}
      {!historyLoading && filtered.length === 0 && (
        <div className="mt-6 bg-white rounded-3xl p-16 border border-gray-100 text-center shadow-soft">
          <h2 className="text-2xl font-bold text-brand-ink">No cover letters yet</h2>
          <p className="text-gray-500 mt-3">
            Generate your first cover letter to see it saved here.
          </p>
        </div>
      )}

      {/* TABLE VIEW */}
      {!historyLoading && filtered.length > 0 && view === "table" && (
        <div className="mt-6 bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
          <div className={`grid ${COLS} gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500`}>
            <p>Title</p>
            <p>Tone</p>
            <p>Created</p>
            <p className="text-right">Actions</p>
          </div>

          {filtered.map((item) => (
            <div
              key={item._id}
              className={`grid ${COLS} gap-4 px-6 py-4 border-b border-gray-100 last:border-0 items-center hover:bg-brand-primary/5 transition-colors`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-brand-primary" />
                </div>
                <p className="font-semibold text-brand-ink truncate">
                  {item.title || "Untitled Cover Letter"}
                </p>
              </div>
              <div><ToneBadge tone={item.tone} /></div>
              <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</p>
              <RowActions item={item} />
            </div>
          ))}
        </div>
      )}

      {/* GRID VIEW */}
      {!historyLoading && filtered.length > 0 && view === "grid" && (
        <div className="mt-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-3xl border border-gray-100 shadow-soft p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-brand-primary" />
                </div>
                <ToneBadge tone={item.tone} />
              </div>

              <h3 className="font-semibold text-brand-ink mt-4 truncate">
                {item.title || "Untitled Cover Letter"}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-3 leading-relaxed flex-1">
                {item.content}
              </p>

              <div className="flex items-center gap-2 border-t border-gray-100 mt-4 pt-4">
                <span className="text-xs text-gray-400 flex-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
                <RowActions item={item} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="min-w-0">
                <h2 className="font-display text-lg font-semibold text-brand-ink truncate">
                  {active.title || "Untitled Cover Letter"}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5 capitalize">{active.tone} tone</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50 transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy
                    </>
                  )}
                </button>
                <button
                  onClick={() => setActive(null)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto whitespace-pre-line text-sm text-gray-700 leading-relaxed">
              {active.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverLetterHistory;
