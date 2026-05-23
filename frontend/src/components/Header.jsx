import React from "react";

import {
  Bell,
  Crown,
  Menu,
  Search,
} from "lucide-react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useLocation,
} from "react-router-dom";

import {
  toggleSidebar,
} from "@/redux/slices/uiSlice";

const Header = () => {

  const dispatch =
    useDispatch();

  const { user } =
    useSelector(
      (state) => state.auth
    );

  const location =
    useLocation();

  // DYNAMIC PAGE TITLE
  const getPageTitle = () => {

    switch (location.pathname) {

      case "/dashboard":
        return "Dashboard";

      case "/ats":
        return "ATS Analyzer";

      case "/ats/results":
        return "ATS Results";

      case "/resume-builder":
        return "Resume Builder";

      case "/resume-manager":
        return "Resume Manager";

      case "/interview-chat":
        return "Interview Chat";

      default:
        return "AI Career Platform";
    }
  };

  return (

    <header className="
      h-16
      bg-white
      border-b
      px-6
      flex
      items-center
      justify-between
      shrink-0
    ">

      {/* LEFT */}
      <div className="
        flex
        items-center
        gap-4
      ">

        {/* SIDEBAR TOGGLE */}
        <button

          onClick={()=>
            dispatch(
              toggleSidebar()
            )
          }

          className="
            w-11
            h-11
            rounded-xl
            border
            flex
            items-center
            justify-center
            hover:bg-gray-100
            transition
          "
        >

          <Menu className="
            w-5
            h-5
          " />

        </button>

        {/* PAGE TITLE */}
        <div>

          <h1 className="
            text-2xl
            font-bold
            text-gray-800
          ">

            AI Resume
          </h1>
        </div>

      </div>

      {/* RIGHT */}
      <div className="
        flex
        items-center
        gap-4
      ">

        {/* SEARCH */}
        <div className="
          hidden
          lg:flex
          items-center
          gap-3
          bg-gray-100
          rounded-2xl
          px-4
          py-3
          w-[280px]
        ">

          <Search className="
            w-4
            h-4
            text-gray-400
          " />

          <input
            type="text"

            placeholder="Search..."

            className="
              bg-transparent
              outline-none
              text-sm
              w-full
            "
          />

        </div>

        {/* PLAN */}
        <div className="
          px-4
          py-2
          rounded-2xl
          bg-violet-50
          border
          border-violet-100
          flex
          items-center
          gap-2
        ">

          <Crown className="
            w-4
            h-4
            text-violet-600
          " />

          <span className="
            text-sm
            font-semibold
            text-brand-primary
          ">

            {
              user?.isPremium
              ? "Premium Plan"
              : "Free Plan"
            }

          </span>

        </div>

        {/* NOTIFICATION */}
        <button className="
          w-11
          h-11
          rounded-xl
          border
          flex
          items-center
          justify-center
          hover:bg-gray-100
          transition
        ">

          <Bell className="
            w-5
            h-5
            text-gray-600
          " />

        </button>

        {/* USER */}
        <div className="
          flex
          items-center
          gap-3
          bg-gray-50
          rounded-2xl
          px-3
          py-2
        ">

          <div className="
            w-10
            h-10
            rounded-full
            bg-brand-primary
            text-white
            flex
            items-center
            justify-center
            font-bold
          ">

            {
              user?.name?.charAt(0)
            }

          </div>

          <div className="
            hidden
            md:block
          ">

            <p className="
              text-sm
              font-semibold
            ">

              {user?.name}

            </p>

            {/* <p className="
              text-xs
              text-gray-500
            ">

              {user?.email}

            </p> */}

          </div>

        </div>

      </div>

    </header>
  );
};

export default Header;