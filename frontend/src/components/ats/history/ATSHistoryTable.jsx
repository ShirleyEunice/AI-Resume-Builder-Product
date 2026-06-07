import React from "react";

import {
  Eye,
  Trash2,
  WandSparkles,
} from "lucide-react";

import {
  useDispatch,
  useSelector,
} from "react-redux";
import { deleteATSScan } from "@/services/atsService";
import { removeATSHistoryItem } from "@/redux/slices/atsSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { filter } from "framer-motion/client";

const ATSHistoryTable = ({search, sortBy, setSortBy}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    history,
    historyLoading,
  } = useSelector(
    (state) => state.ats
  );

  const filteredHistory = history.filter((item) =>
  item.resumeName
    ?.toLowerCase()
    .includes(search.toLowerCase())
);

const sortedHistory =

  [...filteredHistory]

  .sort((a, b) => {

    // LATEST
    if (sortBy === "latest") {

      return (
        new Date(b.createdAt)
        -
        new Date(a.createdAt)
      );
    }

    // HIGHEST SCORE
    if (sortBy === "highest") {

      return b.score - a.score;
    }

    // LOWEST SCORE
    if (sortBy === "lowest") {

      return a.score - b.score;
    }

    return 0;
  });

  const handleDelete = async(id)=>{
    try {
      await deleteATSScan(id);
      dispatch(removeATSHistoryItem(id));

      toast.success("ATS Scan deleted");
    } catch (error) {
      toast.error("Delete failed")
    }
  }

  /*
  =========================
  LOADING STATE
  =========================
  */

  if (historyLoading) {

    return (

      <div className="
        mt-6
        bg-white
        rounded-3xl
        border
        overflow-hidden
      ">

        {/* HEADER SKELETON */}

        <div className="
          grid
          grid-cols-6
          gap-4
          px-6
          py-5
          border-b
          bg-gray-50
        ">

          {
            Array.from({
              length: 6
            }).map((_, i)=>(

              <div
                key={i}

                className="
                  h-4
                  bg-gray-200
                  rounded
                  animate-pulse
                "
              />

            ))
          }

        </div>

        {/* ROW SKELETONS */}

        {
          Array.from({
            length: 5
          }).map((_, i)=>(

            <div
              key={i}

              className="
                grid
                grid-cols-6
                gap-4
                px-6
                py-6
                border-b
                items-center
              "
            >

              {
                Array.from({
                  length: 6
                }).map((_, j)=>(

                  <div
                    key={j}

                    className="
                      h-5
                      bg-gray-200
                      rounded
                      animate-pulse
                    "
                  />

                ))
              }

            </div>
          ))
        }

      </div>
    );
  }

  /*
  =========================
  EMPTY STATE
  =========================
  */

  if (history.length === 0) {

    return (

      <div className="
        bg-white
        rounded-3xl
        p-16
        border
        text-center
      ">

        <h2 className="
          text-2xl
          font-bold
        ">

          No ATS Scans Yet

        </h2>

        <p className="
          text-gray-500
          mt-3
        ">

          Analyze your first resume
          to see scan history here.

        </p>

      </div>
    );
  }

  /*
  =========================
  ACTUAL TABLE
  =========================
  */

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
        sortedHistory.map((item)=>{

          return (

            <div
              key={item._id}

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

                  {item.resumeName}

                </p>

              </div>

              {/* JD */}

              <div>

                <p className="
                  text-sm
                  text-gray-600
                  line-clamp-2
                ">

                  {
                    item.jdText?.substring(
                      0,
                      50
                    )
                  }...

                </p>

              </div>

              {/* SUMMARY */}

              <div>

                <p className="
                  text-sm
                  text-gray-500
                  line-clamp-2
                ">

                  {
                    item.summary?.substring(
                      0,
                      60
                    )
                  }...

                </p>

              </div>

              {/* DATE */}

              <div>

                <p className="
                  text-sm
                  text-gray-500
                ">

                  {
                    new Date(
                      item.createdAt
                    ).toLocaleDateString()
                  }

                </p>

              </div>

              {/* ACTIONS */}

              <div className="
                flex
                items-center
                gap-3
              ">

                {/* VIEW */}

                <button className="
                  p-3
                  rounded-xl
                  bg-violet-100
                  text-violet-700
                  hover:bg-violet-200
                  transition
                "
                onClick={()=> navigate(`/ats/results/${item._id}`)}>

                  <Eye className="
                    w-4
                    h-4
                  " />

                </button>

                {/* IMPROVE */}

                <button className="
                  p-3
                  rounded-xl
                  bg-blue-100
                  text-blue-700
                  hover:bg-blue-200
                  transition
                "
                onClick={()=> navigate("/resume/start")}>

                  <WandSparkles className="
                    w-4
                    h-4
                  " />

                </button>

                {/* DELETE */}

                <button className="
                  p-3
                  rounded-xl
                  bg-red-100
                  text-red-700
                  hover:bg-red-200
                  transition
                "
                onClick={()=> handleDelete(item._id)}>

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