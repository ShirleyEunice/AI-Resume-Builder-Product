import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { createResume } from '../features/resumeSlice';
import { fetchATSScore } from '../features/atsSlice';

const CreateResume = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {atsScore} = useSelector((state)=> state.agent);

    const [form, setForm] = useState({
        title: "",
        name: "",
        email:"",

    });

    useEffect(() => {
      const timer = setTimeout(() => {
        dispatch(
          fetchATSScore({
            title: form.title,
            personalInfo: {
              name: form.name,
              email: form.email,
            },
          }),
        );
      }, 500);

      return () => clearTimeout(timer);
    }, [form, dispatch]);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const data = {
            title: form.title,
            personalInfo:{
                name: form.name,
                email: form.email,
            }
        };
         console.log("Sending data:", data);
        await dispatch(createResume(data));
        navigate("/");
    }

  return (
    <div className='p-5'>
        <h1 className='text-2xl font-bold mb-4'>Create Resume</h1>
        <h2 className='text-lg font-semibold mb-2'>ATS Score: {atsScore} %</h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
            <input 
            type="text" 
            className='border p-2 w-full'
            placeholder='Title'
            value={form.title}
            onChange={(e)=> setForm({...form, title: e.target.value})} />

             <input 
            type="text" 
            className='border p-2 w-full'
            placeholder='Name'
            value={form.name}
            onChange={(e)=> setForm({...form, name: e.target.value})} />

             <input 
            type="text" 
            className='border p-2 w-full'
            placeholder='Email'
            value={form.email}
            onChange={(e)=> setForm({...form, email: e.target.value})} />

            <button type='submit' className='bg-blue-500 text-white px-4 py-2'>Create Resume</button>
        </form>
    </div>
  )
}

export default CreateResume