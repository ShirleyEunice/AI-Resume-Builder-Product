import ColorSelector from '@/components/resume/templates/ColorSelector'
import MarginSelector from '@/components/resume/templates/MarginSelector'
import ClassicTemplate from '@/components/resume/templates/preview/ClassicTemplate'
import CreativeTemplate from '@/components/resume/templates/preview/CreativeTemplate'
import MinimalTemplate from '@/components/resume/templates/preview/MinimalTemplate'
import ModernTemplate from '@/components/resume/templates/preview/ModernTemplate'
import ResumeLivePreview from '@/components/resume/templates/ResumeLivePreview'
import SpacingSelector from '@/components/resume/templates/SpacingSelector'
import TemplateCard from '@/components/resume/templates/TemplateCard'
import sampleResume from '@/data/sampleResume'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TemplateSelectionPage = () => {
  const navigate = useNavigate();
  const [mobileTab, setMobileTab] = useState("customize");

  return (
    <div className='h-full overflow-hidden bg-gray-100 flex flex-col'>

      {/* Mobile tab toggle */}
      <div className='flex md:hidden border-b bg-white shrink-0'>
        <button
          onClick={() => setMobileTab("customize")}
          className={`flex-1 py-3 text-sm font-semibold transition ${
            mobileTab === "customize"
              ? "text-brand-primary border-b-2 border-brand-primary"
              : "text-gray-400"
          }`}
        >
          Customize
        </button>
        <button
          onClick={() => setMobileTab("preview")}
          className={`flex-1 py-3 text-sm font-semibold transition ${
            mobileTab === "preview"
              ? "text-brand-primary border-b-2 border-brand-primary"
              : "text-gray-400"
          }`}
        >
          Preview
        </button>
      </div>

      <div className='flex flex-1 overflow-hidden'>

        {/* Left panel — customize */}
        <div className={`
          overflow-y-auto bg-white p-6 md:p-10
          md:w-[45%] md:block
          ${mobileTab === "customize" ? "block w-full" : "hidden"}
        `}>
          <h1 className='text-2xl md:text-4xl font-bold'>Choose your template</h1>
          <p className='mt-2 text-gray-500 text-sm'>Customize spacing, margins and template.</p>

          <div className='mt-8'>
            <h2 className='text-base md:text-xl font-semibold mb-3'>Accent color</h2>
            <ColorSelector />
          </div>

          <div className='mt-8'>
            <h2 className='text-base md:text-xl font-semibold'>Line spacing</h2>
            <SpacingSelector />
          </div>

          <div className='mt-8'>
            <h2 className='text-base md:text-xl font-semibold'>Margins</h2>
            <MarginSelector />
          </div>

          <div className='mt-8'>
            <h2 className='text-base md:text-xl font-semibold mb-4'>Templates</h2>
            <div className='grid grid-cols-2 gap-4'>
              <TemplateCard template="modern" title="Modern" preview={<ModernTemplate resume={sampleResume} />} />
              <TemplateCard template="classic" title="Classic" preview={<ClassicTemplate resume={sampleResume} />} />
              <TemplateCard template="minimal" title="Minimal" preview={<MinimalTemplate resume={sampleResume} />} />
              <TemplateCard template="creative" title="Creative" preview={<CreativeTemplate resume={sampleResume} />} />
            </div>
          </div>

          <div className='mt-10 flex justify-end'>
            <button
              onClick={() => navigate("/resume/builder")}
              className='px-6 py-3 rounded-2xl bg-teal-800 text-white font-semibold hover:bg-teal-700 transition text-sm'
            >
              Continue
            </button>
          </div>
        </div>

        {/* Right panel — preview */}
        <div className={`
          bg-gray-200 overflow-y-auto p-5 md:p-10
          md:flex md:flex-1
          ${mobileTab === "preview" ? "flex flex-1" : "hidden"}
        `}>
          <ResumeLivePreview />
        </div>

      </div>
    </div>
  )
}

export default TemplateSelectionPage