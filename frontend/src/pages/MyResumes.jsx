import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchResumes } from '../features/resumeSlice';
import { useNavigate } from 'react-router-dom';

const MyResumes = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {resumes, loading} = useSelector((state)=> state.resume);

    useEffect(()=>{
        dispatch(fetchResumes());
    }, []);
  return (
    <div className='p-5'>
        <h1 className='text-2xl font-bold mb-4'>My Resumes</h1>
        {loading && <p>Loading...</p>}
        <button
        onClick={()=> navigate("/create")}
        className='bg-green-500 text-white py-4 px-2 mb-4'>+ Create Resume</button>
        <div className='grid grid-cols-3 gap-4'>
            {resumes.map((resumes)=>(
                <div key={resumes._id} className='border p-4 shadow rounded'>
                    <h2 className='font-semibold'>{resumes.title}</h2>
                    <p>{resumes.personal_info}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MyResumes