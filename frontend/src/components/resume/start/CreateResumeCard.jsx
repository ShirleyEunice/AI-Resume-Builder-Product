import { resetResume } from '@/redux/slices/resumeSlice';
import { Plus } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const CreateResumeCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCreate = ()=>{
        dispatch(resetResume());
        navigate("/resume/templates");
    };
  return (
    <button 
    onClick={handleCreate}
    className='bg-white rounded-3xl border p-10 text-center shadow-sm hover:shadow-lg transition hover:-translate-y-1'>
        <div className='w-20 h-20 mx-auto rounded-2xl bg-teal-100 flex items-center justify-center'>
            <Plus className='w-10 h-10 text-teal-700'/>
        </div>
        <h2 className='mt-6 text-2xl font-bold'>Create Resume</h2>
        <p className='mt-3 text-gray-500'>Start building your resume from scratch</p>
    </button>
  )
}

export default CreateResumeCard