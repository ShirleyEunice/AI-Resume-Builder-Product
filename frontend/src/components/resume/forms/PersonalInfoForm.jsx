import { Hand } from 'lucide-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateResume } from '@/redux/slices/resumeSlice';

const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const {currentResume} = useSelector((state)=> state.resume);

  const handleChange = (e)=>{
    dispatch(
      updateResume({
        section: "personalInfo",
        data:{
          ...personalInfo,
          [e.target.name]: e.target.value,
        }
      })
    )
  }

  const personalInfo = currentResume?.personalInfo || {};
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold'>Personal Information</h1>

      <input 
      type="text"
      name="fullName"
      placeholder='Full Name'
      value={personalInfo.fullName || ""}
      onChange={handleChange}
      className='w-full rounded p-3 border' />

      <input 
      type="text"
      name="email"
      placeholder='Email'
      value={personalInfo.email || ""}
      onChange={handleChange}
      className='w-full rounded p-3 border' />

      <input 
      type="text"
      name="headLine"
      placeholder='Head Line'
      value={personalInfo.headLine || ""}
      onChange={handleChange}
      className='w-full rounded p-3 border' />

      <input 
      type="text"
      name='phone'
      placeholder='Phone'
      value={personalInfo.phone || ""}
      onChange={handleChange}
      className='w-full rounded p-3 border' />

      <input 
      type="text"
      name='location'
      placeholder='Address'
      value={personalInfo.location || ""}
      onChange={handleChange}
      className='w-full rounded p-3 border' />

      <input 
      type="text"
      name='linkedin'
      placeholder='Linkedin'
      value={personalInfo.linkedin || ""}
      onChange={handleChange}
      className='w-full rounded p-3 border' />

      <input 
      type="text"
      name='github'
      placeholder='Github'
      value={personalInfo.github || ""}
      onChange={handleChange}
      className='w-full rounded p-3 border' />

      <input 
      type="text" 
      name='portfolio'
      placeholder='Portfolio'
      value={personalInfo.portfolio || ""}
      onChange={handleChange}
      className='w-full rounded p-3 border' />

      <textarea
      name='summary'
      placeholder='Professional Summary'
      value={personalInfo.summary || ""}
      onChange={handleChange}
      className='w-full rounded p-3 border h-32'/>
    </div>
  )
}

export default PersonalInfoForm