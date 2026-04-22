import API from '@/api/axios';
import { Button } from '@/components/ui/button';
import { div } from 'framer-motion/client';
import React, { useState } from 'react'

const ResumeAnalyzer = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);


    const handleUpload = async ()=>{
        const formData = new FormData();
        formData.append('file', file);

        const res = await API.post("/agent/analyze", formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });

        setResult(res.data);
    }

  return (
    <div className='p-5'>
        <h1 className='text-xl font-bold mb-4'>Resume Analyzer</h1>

        <input 
        type='file'
        // value={file}
        onChange={(e)=> setFile(e.target.files[0])} />

        <Button
        onClick={handleUpload}
        className='ml-2 bg-blue-500 text-white px-3 py-1'>Analyze</Button>

        {result && (
            <div className='mt-4'>
                <p className='font-bold'>Score: {result.score}</p>
                <p className='font-bold'>Missing Keywords:</p>
                <ul>
                    {result.missingKeywords.map((m, i)=>(
                        <li key={i}>{m}</li>
                    ))}
                </ul>

                <p className='font-bold'>Suggestions:</p>
                <ul>
                    {result.suggestions.map ((s, i)=>(
                        <li key={i}>{s}</li>
                    ))}
                </ul>
            </div>
        )}
    </div>
  )
}

export default ResumeAnalyzer