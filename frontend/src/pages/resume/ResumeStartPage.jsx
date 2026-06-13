import CreateResumeCard from '@/components/resume/start/CreateResumeCard'
import ImportLinkedInCard from '@/components/resume/start/ImportLinkedInCard'
import ImportResumeCard from '@/components/resume/start/ImportResumeCard'
import React from 'react'

const ResumeStartPage = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8'>
      <div className='max-w-5xl w-full'>
        <div className='text-center mb-8 md:mb-14'>
          <h1 className='text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight'>How do you want to start?</h1>
          <p className='mt-3 text-sm sm:text-lg text-gray-500'>Build a professional ATS friendly resume.</p>
        </div>

        {/*Cards */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8'>
          <CreateResumeCard/>
          <ImportLinkedInCard/>
          <ImportResumeCard/>
        </div>
      </div>
    </div>
  )
}

export default ResumeStartPage