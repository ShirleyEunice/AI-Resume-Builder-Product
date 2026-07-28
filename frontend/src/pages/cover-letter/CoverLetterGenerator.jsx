import GenerateButton from '@/components/cover-letter/GenerateButton';
import JDInput from '@/components/cover-letter/JDInput';
import ResultPanel from '@/components/cover-letter/ResultPanel';
import ResumeSelector from '@/components/cover-letter/ResumeSelector';
import { resetCoverLetterState } from '@/redux/slices/coverLetterSlice';
import { History } from 'lucide-react';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const CoverLetterGenerator = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(resetCoverLetterState());
    }, [dispatch])
  return (
     <div className="h-full overflow-y-auto bg-gray-100 p-5">
        <div className="space-y-5 pb-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Cover Letter Generator</h1>
              <p className="text-sm text-gray-500 mt-1">
                Pick a resume, paste a job description, and generate a tailored cover letter.
              </p>
            </div>
            <Link
              to="/cover-letter/history"
              className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition shrink-0"
            >
              <History className="w-4 h-4" /> History
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 items-start">
            <ResumeSelector />
            <JDInput />
          </div>

          <div className="flex justify-end">
            <GenerateButton />
          </div>

          <ResultPanel />
        </div>
      </div>
  )
}

export default CoverLetterGenerator