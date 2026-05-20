import CreditUsage from "@/components/dashboard/CreditUsage";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentChats from "@/components/dashboard/RecentChats";
import RecentResumes from "@/components/dashboard/RecentResumes";
import StatsCard from "@/components/dashboard/StatsCard";
import UpgradeBanner from "@/components/dashboard/UpgradeBanner";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import React from "react";


const Dashboard = () => {

  return (

    <div className="
      min-h-screen
      bg-gray-100
      p-5
      space-y-5
    ">

      {/* HERO */}
      <WelcomeBanner />

      {/* STATS */}
      <StatsCard />

      {/* MAIN GRID */}
      <div className="
        grid
        grid-cols-1
        xl:grid-cols-12
        gap-5
        items-start
      ">

        {/* LEFT */}
        <div className="
          xl:col-span-8
          space-y-5
        ">

          <QuickActions />

          <RecentResumes />

          <RecentChats />

        </div>

        {/* RIGHT */}
        <div className="
          xl:col-span-4
          space-y-7
          sticky
          top-5
        ">

          <CreditUsage />

          <UpgradeBanner />

        </div>

      </div>

    </div>
  );
};

export default Dashboard;