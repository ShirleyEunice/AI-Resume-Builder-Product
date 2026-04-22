import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="p-5 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout