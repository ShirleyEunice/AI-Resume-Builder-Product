import React from "react";

import {

  Eye,
  Trash2,
  WandSparkles,

} from "lucide-react";

const dummyData = [

  {
    id: 1,

    score: 84,

    resume:
      "Frontend Developer Resume",

    jd:
      "Senior React Developer",

    summary:
      "Strong React and UI skills",

    date:
      "May 18, 2026",
  },

  {
    id: 2,

    score: 62,

    resume:
      "Fullstack Resume",

    jd:
      "MERN Stack Engineer",

    summary:
      "Missing cloud experience",

    date:
      "May 15, 2026",
  },
];

const ATSHistoryTable = () => {

  return (

    <div className="
      mt-6
      bg-white
      rounded-3xl
      border
      overflow-hidden
    ">

      {/* HEADER */}

      <div className="
        grid
        grid-cols-6
        gap-4
        px-6
        py-5
        border-b
        bg-gray-50
        text-sm
        font-semibold
        text-gray-500
      ">

        <p>Score</p>

        <p>Resume</p>

        <p>Job Description</p>

        <p>Summary</p>

        <p>Date</p>

        <p>Actions</p>

      </div>

      {/* ROWS */}

      {
        dummyData.map((item)=>{

          return (

            <div
              key={item.id}

              className="
                grid
                grid-cols-6
                gap-4
                px-6
                py-5
                border-b
                items-center
                hover:bg-violet-50
                transition
              "
            >

              {/* SCORE */}

              <div className="
                flex
                items-center
                gap-3
              ">

                <div className="
                  w-14
                  h-14
                  rounded-full
                  border-4
                  border-violet-500
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-violet-700
                ">

                  {item.score}

                </div>

              </div>

              {/* RESUME */}

              <div>

                <p className="
                  font-semibold
                ">
                  {item.resume}
                </p>

              </div>

              {/* JD */}

              <div>

                <p className="
                  text-sm
                  text-gray-600
                ">
                  {item.jd}
                </p>

              </div>

              {/* SUMMARY */}

              <div>

                <p className="
                  text-sm
                  text-gray-500
                ">
                  {item.summary}
                </p>

              </div>

              {/* DATE */}

              <div>

                <p className="
                  text-sm
                  text-gray-500
                ">
                  {item.date}
                </p>

              </div>

              {/* ACTIONS */}

              <div className="
                flex
                items-center
                gap-3
              ">

                <button className="
                  p-3
                  rounded-xl
                  bg-violet-100
                  text-violet-700
                  hover:bg-violet-200
                  transition
                ">

                  <Eye className="
                    w-4
                    h-4
                  " />

                </button>

                <button className="
                  p-3
                  rounded-xl
                  bg-blue-100
                  text-blue-700
                ">

                  <WandSparkles className="
                    w-4
                    h-4
                  " />

                </button>

                <button className="
                  p-3
                  rounded-xl
                  bg-red-100
                  text-red-700
                ">

                  <Trash2 className="
                    w-4
                    h-4
                  " />

                </button>

              </div>

            </div>
          );
        })
      }

    </div>
  );
};

export default ATSHistoryTable;