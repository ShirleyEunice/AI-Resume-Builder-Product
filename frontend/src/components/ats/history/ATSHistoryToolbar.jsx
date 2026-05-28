import React from "react";
import {ArrowUpDown, Search,} from "lucide-react";

const ATSHistoryToolbar = ({search, setSearch, sortBy, setSortBy}) => {

  return (
    <div
      className="
      mt-6
      bg-white
      rounded-3xl
      border
      p-5
      flex
      items-center
      justify-between
      gap-4
    "
    >
      {/* SEARCH */}

      <div
        className="
        flex
        items-center
        gap-3
        bg-gray-100
        rounded-2xl
        px-4
        py-3
        w-[350px]
      "
      >
        <Search
          className="
          w-5
          h-5
          text-gray-400
        "
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="
Search resume or job title...
          "
          className="
            bg-transparent
            outline-none
            w-full
            text-sm
          "
        />
      </div>

      {/* SORT */}

      <div
        className="
  flex
  items-center
  gap-3
"
      >
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="
      border
      rounded-2xl
      px-5
      py-3
      text-sm
      font-medium
      outline-none
      bg-white
      hover:border-violet-400
      transition
      cursor-pointer
    "
        >
          <option value="latest">Latest</option>

          <option value="highest">Highest Score</option>

          <option value="lowest">Lowest Score</option>
        </select>
      </div>
    </div>
  );
};

export default ATSHistoryToolbar;