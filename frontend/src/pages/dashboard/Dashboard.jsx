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
    <div className="min-h-screen bg-gray-100 p-3 sm:p-5 space-y-5">
      {/* Hero */}
      <WelcomeBanner />

      {/* Stats */}
      <StatsCard />

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left */}
        <div className="xl:col-span-8 space-y-5">
          <QuickActions />
          <RecentResumes />
          <RecentChats />
        </div>

        {/* Right */}
        <div className="xl:col-span-4 space-y-5 xl:sticky xl:top-5">
          <CreditUsage />
          <UpgradeBanner />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
