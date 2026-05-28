import React from "react";

import {

  Search,
  ArrowUpDown,

} from "lucide-react";

const ATSHistoryToolbar = () => {

  return (

    <div className="
      mt-6
      bg-white
      rounded-3xl
      border
      p-5
      flex
      items-center
      justify-between
      gap-4
    ">

      {/* SEARCH */}

      <div className="
        flex
        items-center
        gap-3
        bg-gray-100
        rounded-2xl
        px-4
        py-3
        w-[350px]
      ">

        <Search className="
          w-5
          h-5
          text-gray-400
        " />

        <input
          type="text"

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

      <button className="
        flex
        items-center
        gap-2
        px-5
        py-3
        rounded-2xl
        border
        hover:bg-gray-50
        transition
      ">

        <ArrowUpDown className="
          w-4
          h-4
        " />

        Sort By Score

      </button>

    </div>
  );
};

export default ATSHistoryToolbar;