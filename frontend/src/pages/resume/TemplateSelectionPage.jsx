import MarginSelector from '@/components/resume/templates/MarginSelector'
import ClassicTemplate from '@/components/resume/templates/preview/ClassicTemplate'
import CreativeTemplate from '@/components/resume/templates/preview/CreativeTemplate'
import MinimalTemplate from '@/components/resume/templates/preview/MinimalTemplate'
import ModernTemplate from '@/components/resume/templates/preview/ModernTemplate'
import ResumeLivePreview from '@/components/resume/templates/ResumeLivePreview'
import SpacingSelector from '@/components/resume/templates/SpacingSelector'
import TemplateCard from '@/components/resume/templates/TemplateCard'
import sampleResume from '@/data/sampleResume'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const TemplateSelectionPage = () => {
  const navigate = useNavigate();
  return (
    <div className='h-screen overflow-hidden bg-gray-100 flex'>
      {/* left panel */}
      <div className='w-[45%] overflow-y-auto bg-white p-10'>
        <h1 className='text-4xl font-bold'>Choose your template</h1>
        <p className='mt-3 text-gray-500'>Customize spacing, margins and template.</p>
        {/* Spacing */}
        <div className='mt-10'>
          <h2 className='text-xl font-semibold'>Line spacing</h2>
          <SpacingSelector/>
        </div>

        {/*Margins */}
        <div className='mt-10'>
          <h2 className='text-xl font-semibold'>Margins</h2>
          <MarginSelector/>
        </div>

        {/* Template Grid */}
        <div className='mt-10'>
          <h2 className='text-xl font-semibold mb-6'>Templates</h2>
          <div className='grid grid-cols-2 gap-6'>
            <TemplateCard
            template="modern"
            title="Modern"
            preview={<ModernTemplate resume={sampleResume}/>}/>
            <TemplateCard
            template="classic"
            title="Classic"
            preview={<ClassicTemplate resume={sampleResume}/>}/>
            <TemplateCard
            template="minimal"
            title="Minimal"
            preview={<MinimalTemplate resume={sampleResume}/>}/>
            <TemplateCard
            template="creative"
            title="Creative"
            preview={<CreativeTemplate resume={sampleResume}/>}/>
          </div>
        </div>

        {/* Continue */}
        <div className='mt-12 flex justify-end'>
          <button onClick={()=> navigate("/resume/builder")}
            className='px-8 py-4 rounded-2xl bg-teal-800 text-white font-semibold hover:bg-teal-700 transition'>
              Continue
            </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className='flex-1 bg-gray-200 overflow-y-auto p-10'>
        <ResumeLivePreview/>
      </div>
    </div>
  )
}

export default TemplateSelectionPage