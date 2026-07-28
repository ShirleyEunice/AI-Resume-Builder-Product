import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setJdText } from '@/redux/slices/coverLetterSlice';

const JDInput = () => {
    const dispatch = useDispatch();
    const {jdText} = useSelector((state)=> state.coverLetter);
  return (
     <div className="bg-white rounded-3xl p-6 border shadow-sm h-full">
        <h2 className="text-lg font-bold text-gray-800">Step 2: Paste a job description</h2>
        <p className="text-xs text-gray-500 mt-1">
          Aim to exclude benefits, perks, and legal disclaimers
        </p>

        <textarea
          value={jdText}
          onChange={(e) => dispatch(setJdText(e.target.value))}
          placeholder="Copy and paste the job description here…"
          className="mt-5 w-full h-[360px] resize-none rounded-2xl border border-gray-200 p-4 text-sm outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
        />
      </div>
  )
}

export default JDInput