import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import PremiumBanner from './PremiumBanner'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className="h-screen overflow-hidden bg-gray-100 dark:bg-black">

      {/* Premium Banner */}
      <PremiumBanner />

      {/* Header */}
      <Header />

      {/* MAIN APP */}
      <div className="flex h-[calc(100vh-104px)]">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default AppLayout