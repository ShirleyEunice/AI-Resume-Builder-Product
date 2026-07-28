import { removeManagerResume } from '@/redux/slices/resumeManagerSlice';
import { setResume } from '@/redux/slices/resumeSlice';
import { deleteResumeById, getResumeById } from '@/services/resumeService';
import { Download, Edit2, Eye, FileText, MessageSquare, MoreVertical, Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageLoader } from '@/components/ui/Loader';
import ViewToggle from '@/components/ui/ViewToggle';

const TemplateBadge = ({ template }) => (
  <span className="px-2.5 py-1 bg-brand-primary/10 text-brand-primary text-xs font-medium rounded-full capitalize">
    {template || "modern"}
  </span>
);

const ScorePill = ({ score }) => {
  if (!score)
    return (
      <span className="text-xs font-medium text-gray-400 px-2.5 py-1 bg-gray-100 rounded-full">
        No score
      </span>
    );
  const c =
    score >= 80 ? "bg-green-50 text-green-600" : score >= 60 ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600";
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c}`}>ATS {score}</span>;
};

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  if (days < 365) return `${Math.floor(days / 30)} mo ago`;
  return `${Math.floor(days / 365)} yr ago`;
};

const RowActions = ({ resume, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const btnRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const handleToggle = () => {
    const rect = btnRef.current.getBoundingClientRect();
    setMenuPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
    setOpen((o) => !o);
  };

  const action = (fn) => { fn(); setOpen(false); };

  const items = [
    { label: "Edit",           icon: <Edit2 className="w-4 h-4" />,        color: "text-brand-primary", fn: () => onEdit(resume) },
    { label: "View",           icon: <Eye className="w-4 h-4" />,           color: "text-blue-600",      fn: () => navigate(`/resume/preview/${resume._id}`) },
    { label: "Download",       icon: <Download className="w-4 h-4" />,      color: "text-green-600",     fn: () => onEdit(resume) },
    { label: "Interview Prep", icon: <MessageSquare className="w-4 h-4" />, color: "text-amber-600",     fn: () => navigate(`/interview?resumeId=${resume._id}`) },
    { label: "Delete",         icon: <Trash2 className="w-4 h-4" />,        color: "text-red-500",       fn: () => onDelete(resume._id), divider: true },
  ];

  return (
    <div>
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {open && createPortal(
        <div
          style={{ position: "fixed", top: menuPos.top, right: menuPos.right, zIndex: 9999 }}
          className="bg-white border border-gray-200 rounded-xl shadow-lg py-1 w-44"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {items.map(({ label, icon, color, fn, divider }) => (
            <React.Fragment key={label}>
              {divider && <div className="my-1 border-t border-gray-100" />}
              <button
                onClick={() => action(fn)}
                className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-gray-50 transition ${color}`}
              >
                {icon}
                {label}
              </button>
            </React.Fragment>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
};

const COLS = "grid-cols-[2fr_1fr_1fr_1fr_60px]";

const ResumeManagerTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resumes, loading } = useSelector((state) => state.resumeManager);
  const [view, setView] = useState("table");

  const handleEdit = async (resume) => {
    try {
      const fullResume = await getResumeById(resume._id);
      dispatch(setResume(fullResume));
      navigate("/resume/builder");
    } catch {
      toast.error("Failed to load resume");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteResumeById(id);
      dispatch(removeManagerResume(id));
      toast.success("Resume deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100">
        <PageLoader label="Loading resumes…" />
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-16 border border-gray-100 text-center shadow-soft">
        <h2 className="text-2xl font-bold text-brand-ink">No resumes yet</h2>
        <p className="text-gray-500 mt-3">Create your first resume to see it here.</p>
        <button
          onClick={() => navigate("/resume/start")}
          className="mt-6 px-6 py-3 bg-brand-primary text-white rounded-xl hover:bg-teal-600 transition font-medium shadow-brand"
        >
          Create Resume
        </button>
      </div>
    );
  }

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
            <p>Resume</p>
            <p>Template</p>
            <p>ATS Score</p>
            <p>Last Modified</p>
            <p className="text-right">·</p>
          </div>

          {resumes.map((resume) => (
            <div
              key={resume._id}
              className={`grid ${COLS} gap-4 px-6 py-4 border-b border-gray-100 last:border-0 items-center hover:bg-brand-primary/5 transition-colors`}
            >
              <div className="min-w-0">
                <p className="font-semibold text-brand-ink truncate">{resume.title}</p>
                <p className="text-sm text-gray-500 truncate">
                  {resume.personalInfo?.jobTitle || "No job title"}
                </p>
              </div>
              <div><TemplateBadge template={resume.template} /></div>
              <div><ScorePill score={resume.atsScore} /></div>
              <p className="text-sm text-gray-500">{timeAgo(resume.updatedAt)}</p>
              <div className="flex justify-end">
                <RowActions resume={resume} onEdit={handleEdit} onDelete={handleDelete} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="group bg-white rounded-3xl border border-gray-100 shadow-soft p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-brand-primary" />
                </div>
                <RowActions resume={resume} onEdit={handleEdit} onDelete={handleDelete} />
              </div>

              <h3 className="font-semibold text-brand-ink mt-4 truncate">{resume.title}</h3>
              <p className="text-sm text-gray-500 truncate">
                {resume.personalInfo?.jobTitle || "No job title"}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <TemplateBadge template={resume.template} />
                <ScorePill score={resume.atsScore} />
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 mt-4 pt-4">
                <span className="text-xs text-gray-400">Updated {timeAgo(resume.updatedAt)}</span>
                <button
                  onClick={() => handleEdit(resume)}
                  className="text-xs font-semibold text-brand-primary hover:underline"
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeManagerTable;
