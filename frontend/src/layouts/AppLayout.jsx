import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useDispatch, useSelector } from "react-redux";
import { closeMobileSidebar } from "@/redux/slices/uiSlice";

const AppLayout = () => {
  const dispatch = useDispatch();
  const { mobileSidebarOpen } = useSelector((state) => state.ui);

  return (
    <div className="h-screen overflow-hidden bg-gray-100 flex flex-col">

      <Header />

      <div className="flex flex-1 overflow-hidden relative">

        {/* Mobile backdrop */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => dispatch(closeMobileSidebar())}
          />
        )}

        {/* Sidebar — drawer on mobile, fixed column on desktop */}
        <div className={`
          fixed inset-y-0 left-0 z-40 md:relative md:z-auto
          transform transition-transform duration-300
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}>
          <Sidebar />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AppLayout;