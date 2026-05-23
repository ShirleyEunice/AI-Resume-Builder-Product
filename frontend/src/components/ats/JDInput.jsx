import { setJDtext } from "@/redux/slices/atsSlice";
import { div } from "framer-motion/client";
import { FileText, Link2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const JDInput = () => {
  const [activeTab, setActiveTab] = useState("paste");
  const {jdText} = useSelector((state)=> state.ats);
  const dispatch = useDispatch();
  return (
    <div className="bg-white rounded-3xl p-6 border shadow-sm h-full">
      <h2 className="text-xl font-bold">Job Description</h2>
      <p className="text-xs text-gray-500 mt-1">
        Paste the job description or import using job URL
      </p>

      {/*Tabs */}
      <div className="mt-6 flex gap-3">
        {/*Paste Tab */}
        <button
          onClick={() => setActiveTab("paste")}
          className={`
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-xl
            text-xs
            font-medium
            transition

            ${
              activeTab === "paste"
                ? "bg-brand-primary text-white"
                : "bg-gray-100 text-gray-600"
            }
          `}
        >
          <FileText className="w-4 h-4" />
          Paste JD
        </button>

        {/*URL tab */}
        <button
        onClick={()=> setActiveTab("url")}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition ${activeTab === "url" 
          ? "bg-brand-primary text-white" : "bg-gray-100 text-gray-600"
        }`}>
          <Link2 className="w-4 h-4"/>
          Job URL
        </button>
      </div>

      {/* Conditional Content */}
      <div className="mt-6">
        {
          activeTab === "paste" ? (
            <textarea
            placeholder="Paste complete job description here..."
            value={jdText}
            onChange={(e)=> dispatch(setJDtext(e.target.value))}
            className="w-full h-[260px] border rounded-2xl p-4 outline-none resize-none focus:ring-2 focus:ring-violet-500"/> 
          ) : (
            <div>
              <input type="text"
              value={jdText}
              onChange={(e)=> dispatch(setJDtext(e.target.value))}
              placeholder="https://company.com/careers/job-posting"
              className="w-full border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-violet-500" />

              {/*Help box */}
              <div className="mt-5 bg-violet-50 border border-violet-100 rounded-2xl p-4">
                <p className="text-xs text-brand-primary leading-relaxed">Supported platforms:
                  LinkedIn Jobs,
                  Greenhouse,
                  Lever,
                  Workday,
                  Indeed,
                  and company career pages.</p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default JDInput;
