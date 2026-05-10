import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import PremiumBanner from './PremiumBanner'
import { Outlet } from 'react-router-dom'

const AppLayout = ({children}) => {
  return (
    <>
    <PremiumBanner/>
    {/* Header */}
    <Header/>
    <div className='h-[93vh] flex bg-gray-100 dark:bg-black'>
        {/* Main Sidebar */}
        <Sidebar/>

        {/* Main Content */}
        <div className='flex-1 flex flex-col'>
            {/* Page Content */}
            <main>
                <Outlet/>
            </main>
        </div>
    </div>
    </>
  )
}

export default AppLayout