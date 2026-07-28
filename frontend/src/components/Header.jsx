import React from "react";
import { Bell, Crown, Menu, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleSidebar, toggleMobileSidebar } from "@/redux/slices/uiSlice";

const TITLES = {
  "/dashboard": "Dashboard",
  "/ats": "ATS Analyzer",
  "/ats/results": "ATS Results",
  "/ats-manager": "Scan History",
  "/resume/start": "Resume Builder",
  "/resume/templates": "Resume Builder",
  "/resume/builder": "Resume Builder",
  "/resume-manager": "Resume Manager",
  "/cover-letter": "Cover Letter",
  "/cover-letter/history": "Letter History",
  "/interview-chat": "Interview Chat",
};

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const title = TITLES[location.pathname] || "CareerForge";

  return (
    <header className="h-16 bg-white/80 backdrop-blur border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            dispatch(toggleSidebar());
            dispatch(toggleMobileSidebar());
          }}
          className="w-10 h-10 rounded-xl text-gray-500 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-brand-ink">{title}</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2.5 bg-gray-100 rounded-xl px-3.5 py-2 w-[220px] focus-within:ring-2 focus-within:ring-brand-primary/20 transition">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            placeholder="Search…"
            className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Plan */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-accent/10 text-brand-accent">
          <Crown className="w-3.5 h-3.5" />
          <span className="text-xs font-semibold">{user?.isPremium ? "Premium" : "Free"}</span>
        </div>

        {/* Notification */}
        <button className="w-10 h-10 rounded-xl text-gray-500 flex items-center justify-center hover:bg-gray-100 hover:text-gray-700 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-brand-primary ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-gray-100" />

        {/* User */}
        <button className="flex items-center gap-2.5 p-1 sm:pr-2 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div className="hidden md:block text-left leading-tight">
            <p className="text-sm font-semibold text-brand-ink">{user?.name}</p>
            <p className="text-[11px] text-gray-500 capitalize">{user?.role}</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
