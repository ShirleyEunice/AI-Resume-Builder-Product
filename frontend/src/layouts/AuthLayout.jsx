import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='min-h-screen grid lg:grid-cols-2 bg-white'>
       {/* Left Side */}
       <div className='hidden lg:flex bg-brand-primary text-white p-16 flex-col justify-between'>
        <div>
          <h1 className='text-5xl font-bold leading-tight'>AI Career Platform</h1>
          <p className='mt-6 text-lg text-violet-100'>Build resumes, optimize ATS, prepare interviews and land your dream job.</p>
        </div>
        <div className='text-xs text-violet-200'>
          Powered by AI
        </div>
       </div>

       {/* Right Side */}
       <div className='flex items-center justify-center p-8'>
        <div className='w-full max-w-md'>
          {children}
        </div>
       </div>
    </div>
  )
}

export default AuthLayout