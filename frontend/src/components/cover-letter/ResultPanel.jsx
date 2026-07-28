import { Copy, FileText } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "@/components/ui/Loader";

const ResultPanel = () => {
  const { result, loading, error } = useSelector((state) => state.coverLetter);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result?.content) return;
    await navigator.clipboard.writeText(result.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-10 border shadow-soft flex flex-col items-center justify-center gap-4">
        <Loader size="lg" />
        <p className="text-sm font-medium text-gray-500">Writing your cover letter…</p>
      </div>
    );
  }

   if (error) {
      return (
        <div className="bg-white rounded-3xl p-6 border border-red-200 shadow-sm">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      );
    }
if (!result) return null;

  return <div className="bg-white rounded-3xl p-6 border shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-primary" />
            <h2 className="text-lg font-bold text-gray-800">Your Cover Letter</h2>
          </div>
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
        </div>

        <div className="whitespace-pre-line text-sm text-gray-700 leading-relaxed">
          {result.content}
        </div>
      </div>;
};

export default ResultPanel;
