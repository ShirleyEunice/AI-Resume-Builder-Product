import React from "react";

const ATSHistoryHeader = ({ total = 0 }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-brand-ink">ATS Scan History</h1>
      <p className="text-gray-500 mt-1">
        {total} scan{total !== 1 ? "s" : ""} in your account
      </p>
    </div>
  );
};

export default ATSHistoryHeader;
