import { Download, LayoutTemplate, Save } from 'lucide-react'
import React from 'react'

const BuilderTopbar = () => {
  return (
    <div className="sticky border-t bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b px-6 py-3 flex items-center justify-between">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold">Software Engineer Resume</h1>
        <p className="text-sm text-gray-500">Last edited Just Now</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* ATS Score */}
        <div className="px-4 py-2 rounded-xl bg-green-100 text-green-700 font-semibold">
          ATS Score: 82%
        </div>

        {/* Template */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-100 dark:hover:bg-gray-800">
          <LayoutTemplate size={18} /> Templates
        </button>

        {/* Save */}
        <button
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-xl
            border
            hover:bg-gray-100
            dark:hover:bg-gray-800
          "
        >
          <Save size={18} /> Save
        </button>

        {/* EXPORT */}
        <button
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-xl
            bg-blue-600 text-white
            hover:bg-blue-700
          "
        >
          <Download size={18} />
          Export PDF
        </button>
      </div>
    </div>
  );
}

export default BuilderTopbar