import React from 'react'
import { useSelector } from 'react-redux'

const WelcomeBanner = () => {
    const {user} = useSelector(
        (state)=> state.auth)
  return (
    <div className='bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 text-white'>
        <h1 className='text-3xl font-bold'>Welcome Back, {user?.name}</h1>
        <p className='mt-3 text-violet-100'>Continue building your AI-powered career journey.</p>
    </div>
  )
}

export default WelcomeBanner