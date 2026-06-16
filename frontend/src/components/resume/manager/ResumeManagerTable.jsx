import { removeManagerResume } from '@/redux/slices/resumeManagerSlice';
import { setResume } from '@/redux/slices/resumeSlice';
import { deleteResumeById, getResumeById } from '@/services/resumeService';
import { Download, Edit2, Eye, MessageSquare, MoreVertical, Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ATSBadge = ({ score }) => {
  if (score == null || score === 0)
    return <span className="text-gray-400 text-sm">N/A</span>;
  const color =
    score >= 80 ? "border-green-500 text-green-700"
    : score >= 60 ? "border-amber-500 text-amber-700"
    : "border-red-500 text-red-700";
  return (
    <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-sm ${color}`}>
      {score}
    </div>
  );
};

const TemplateBadge = ({ template }) => (
  <span className="px-2.5 py-1 bg-violet-100 text-violet-700 text-xs font-medium rounded-full capitalize">
    {template || "modern"}
  </span>
);

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
    { label: "Edit",           icon: <Edit2 className="w-4 h-4" />,        color: "text-violet-600", fn: () => onEdit(resume) },
    { label: "View",           icon: <Eye className="w-4 h-4" />,           color: "text-blue-600",   fn: () => navigate(`/resume/preview/${resume._id}`) },
    { label: "Download",       icon: <Download className="w-4 h-4" />,      color: "text-green-600",  fn: () => onEdit(resume) },
    { label: "Interview Prep", icon: <MessageSquare className="w-4 h-4" />, color: "text-amber-600",  fn: () => navigate(`/interview?resumeId=${resume._id}`) },
    { label: "Delete",         icon: <Trash2 className="w-4 h-4" />,        color: "text-red-500",    fn: () => onDelete(resume._id), divider: true },
  ];

  return (
    <div className="flex justify-end">
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

const COLS = "grid-cols-[2fr_1fr_1fr_1fr_80px]";

const ResumeManagerTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resumes, loading } = useSelector((state) => state.resumeManager);

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
      <div className="bg-white rounded-3xl border overflow-hidden">
        <div className={`grid ${COLS} gap-4 px-6 py-4 border-b bg-gray-50`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`grid ${COLS} gap-4 px-6 py-5 border-b items-center`}>
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="h-5 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-16 border text-center">
        <h2 className="text-2xl font-bold text-gray-800">No Resumes Yet</h2>
        <p className="text-gray-500 mt-3">Create your first resume to see it here.</p>
        <button
          onClick={() => navigate("/resume/start")}
          className="mt-6 px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition font-medium"
        >
          Create Resume
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border overflow-hidden">
      {/* Header */}
      <div className={`grid ${COLS} gap-4 px-6 py-4 border-b bg-gray-50 text-sm font-semibold text-gray-500`}>
        <p>Resume</p>
        <p>Template</p>
        <p>ATS Score</p>
        <p>Last Modified</p>
        <p className="text-right">Actions</p>
      </div>

      {/* Rows */}
      {resumes.map((resume) => (
        <div
          key={resume._id}
          className={`grid ${COLS} gap-4 px-6 py-5 border-b items-center hover:bg-violet-50 transition`}
        >
          <div>
            <p className="font-semibold text-gray-900 truncate">{resume.title}</p>
            <p className="text-sm text-gray-500">{resume.personalInfo?.jobTitle || "No job title"}</p>
          </div>
          <div><TemplateBadge template={resume.template} /></div>
          <div><ATSBadge score={resume.atsScore} /></div>
          <p className="text-sm text-gray-500">{timeAgo(resume.updatedAt)}</p>
          <RowActions resume={resume} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
};

export default ResumeManagerTable;
