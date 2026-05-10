import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveSection } from '@/redux/slices/resumeSlice'

const sections = [
    "personalInfo",
    "experience",
    "education",
    "projects",
    "skills",
    "certifications"
  ]

const ResumeSidebar = () => {
  const dispatch = useDispatch();
  const {activeSection} = useSelector((state)=> state.resume);

  return (
    <div className='p-4 space-y-2'>
      <h2 className='text-xl font-bold mb-6'>Resume Builder</h2>

      {sections.map((section)=>(
        <button
        key={section}
        onClick={()=> dispatch(setActiveSection(section))}
        className={`w-full text-left px-4 py-3 rounded-lg capitalize transition 
        ${activeSection === section ? 
        "bg-blue-500 text-white" : "hover:bg-gray-200 dark:bg-gray-800"}`}>
          {section}
        </button>
      ))}
    </div>
  )
}

export default ResumeSidebar