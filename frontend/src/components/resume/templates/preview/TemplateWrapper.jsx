import React from 'react'
import { useSelector } from 'react-redux'

const TemplateWrapper = ({children}) => {
    const layout = useSelector((state)=> state.resume.currentResume.layoutSettings);
    const linespacing = layout?.lineSpacing || "1.15";
    const margin = layout?.margin || "0.75";
  return (
    <div className='bg-white shadow-2xl w-[210mm] min-h-[297mm]' id='resume-template'
    style={{lineHeight: linespacing, padding: `${margin}in`}}>{children}</div>
  )
}

export default TemplateWrapper