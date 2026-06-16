import React from 'react'

const ResumeManagerHeader = ({total}) => {
  return (
    <div className='mb-6'>
      <h1 className='text-3xl font-bold text-gray-900'>My Resumes</h1>
       <p className="text-gray-500 mt-1">
          {total} resume{total !== 1 ? "s" : ""} in your account
        </p>
    </div>
  )
}

export default ResumeManagerHeader;