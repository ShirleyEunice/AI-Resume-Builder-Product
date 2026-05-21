import { UploadCloud } from 'lucide-react'
import React from 'react'
import { useDropzone } from 'react-dropzone'

const ResumeUploader = () => {
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      "application/pdf" : [".pdf"],
    }
  })
  return (
    <div className='bg-white rounded-3xl p-6 border shadow-sm h-full'>
      <h2 className='text-xl font-bold'>Upload Resume</h2>
      <p className='text-sm text-gray-500 mt-1'>Upload your resume PDF for ATS analysis</p>
      <div {...getRootProps()}
      className='mt-6 border-2 border-dashed border-violet-300 rounded-2xl p-10 text-center cursor-pointer hover:bg-violet-50 transition'>
        <input {...getInputProps()} />
        <div className='flex flex-col items-center'>
          <div className='w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mb-4'>
            <UploadCloud className='text-violet-600 w-8 h-8'/>
          </div>
          <h3 className='font-semibold text-lg'>Drag & Drop Resume</h3>
          <p className='text-sm text-gray-500 mt-2'>or click to browse PDF file</p>
        </div>
      </div>
    </div>
  )
}

export default ResumeUploader