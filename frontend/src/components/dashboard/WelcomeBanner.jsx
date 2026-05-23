import React from 'react'
import { useSelector } from 'react-redux'

const WelcomeBanner = () => {
    const {user} = useSelector(
        (state)=> state.auth)
  return (
    <div className='bg-gradient-to-r from-brand-dark via-slate-800 to-brand-primary rounded-2xl py-[18px] px-10 text-white relative overflow-hidden shadow-[0_10px_50px_rgba(20,184,166,0.18)]'>
        <h1 className='text-4xl lg:text-3xl leading-tight font-bold'>Welcome Back, {user?.name}</h1>
        <p className='mt-3 text-teal-100'>Continue building your AI-powered career journey.</p>
    </div>
  )
}

export default WelcomeBanner