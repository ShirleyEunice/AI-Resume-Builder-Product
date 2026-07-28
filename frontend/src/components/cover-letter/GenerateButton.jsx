import { setError, setLoading, setResult } from '@/redux/slices/coverLetterSlice';
import { generateCoverLetter } from '@/services/coverLetterService';
import { Sparkles } from 'lucide-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const GenerateButton = () => {
    const dispatch = useDispatch();
    const {selectedResumeId, resumeText, jdText, tone, loading} = useSelector((state)=> state.coverLetter);

    const canGenerate = (selectedResumeId || resumeText.trim()) && jdText.trim();

    const handleGenerate = async ()=>{
        if(!canGenerate) return;

        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            dispatch(setResult(null));

            const data = await generateCoverLetter({
                resumeId: selectedResumeId,
                resumeText,
                jdText,
                tone,
            });
            dispatch(setResult(data));
        } catch (error) {
            dispatch(setError(error.response?.data?.error || "Failed to generate cover letter"));
        }finally{
            dispatch(setLoading(false));
        }
    }
  return (
    <div className="flex items-center gap-3">
        <select
          value={tone}
          onChange={(e) => dispatch(setTone(e.target.value))}
          className="rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
        >
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="enthusiastic">Enthusiastic</option>
        </select>

        <button
          onClick={handleGenerate}
          disabled={!canGenerate || loading}
          className="bg-brand-primary hover:bg-teal-600 text-white px-8 py-3 rounded-2xl font-semibold flex items-center gap-3 shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-5 h-5" />
          {loading ? "Generating…" : "Generate Cover Letter"}
        </button>
      </div>
  )
}

export default GenerateButton