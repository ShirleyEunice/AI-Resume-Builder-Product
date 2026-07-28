import { setResumeFile } from "@/redux/slices/atsSlice";
import { UploadCloud, FileText, CheckCircle2 } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";

const ResumeUploader = () => {
  const dispatch = useDispatch();
  const { resumeFile } = useSelector((state) => state.ats);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    onDrop: (acceptedFiles) => dispatch(setResumeFile(acceptedFiles[0])),
  });

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft h-full">
      <h2 className="text-lg font-bold text-brand-ink">Upload Resume</h2>
      <p className="text-xs text-gray-500 mt-1">Upload your resume PDF for ATS analysis</p>

      <div
        {...getRootProps()}
        className={`mt-6 border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-brand-primary bg-brand-primary/5"
            : "border-gray-200 hover:border-brand-primary/50 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />

        {resumeFile ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="text-green-600 w-8 h-8" />
            </div>
            <div className="flex items-center gap-2 text-base font-semibold text-brand-ink">
              <FileText className="w-5 h-5 text-brand-primary" />
              <span className="truncate max-w-[220px]">{resumeFile.name}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Click or drop to replace</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-4">
              <UploadCloud className="text-brand-primary w-8 h-8" />
            </div>
            <h3 className="font-semibold text-lg text-brand-ink">Drag &amp; drop your resume</h3>
            <p className="text-xs text-gray-500 mt-2">or click to browse a PDF file</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUploader;
