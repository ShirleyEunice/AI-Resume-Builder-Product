import ATSHistoryHeader from '@/components/ats/history/ATSHistoryHeader'
import ATSHistoryTable from '@/components/ats/history/ATSHistoryTable'
import ATSHistoryToolbar from '@/components/ats/history/ATSHistoryToolbar'
import React from 'react'

const ATSHistory = () => {
  return (
    <div className='h-full overflow-y-auto bg-gray-100 p-6'>
      <ATSHistoryHeader/>
      <ATSHistoryToolbar/>
      <ATSHistoryTable/>
    </div>
  )
}

export default ATSHistory