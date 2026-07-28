import React from "react";
import { Search } from "lucide-react";

const ATSHistoryToolbar = ({ search, setSearch, sortBy, setSortBy }) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search resume or job title..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/25"
        />
      </div>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary/25 bg-white"
      >
        <option value="latest">Latest</option>
        <option value="highest">Highest Score</option>
        <option value="lowest">Lowest Score</option>
      </select>
    </div>
  );
};

export default ATSHistoryToolbar;
