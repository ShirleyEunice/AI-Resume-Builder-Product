import API from '@/api/axios';
import { Button } from '@/components/ui/button';
import React from 'react'

const JdMatcher = () => {
    const [resumeText, setResumeText] = React.useState('');
    const [jdText, setJdText] = React.useState('');
    const [result, setResult] = React.useState(null);

    const handleMatch = async ()=>{
        try {
            const response = await API.post("/agent/match", {
                resumeText,
                jdText
            });
            setResult(response.data);
        } catch (error) {
            console.error("Error matching JD:", error);
        }
    }
  return (
    <div className='p-5'>
        <h1 className='text-xl font-bold mb-4'>JD Matcher</h1>

        <textarea
        className='border p-2 w-full mb-3'
        placeholder='Paste the resume text'
        onChange={(e)=> setResumeText(e.target.value)}/>
        <textarea
        className='border p-2 w-full mb-3'
        placeholder='Paste the job description text'
        onChange={(e)=> setJdText(e.target.value)}/>

        <Button
        onClick={handleMatch} 
    className="bg-blue-500 text-white px-3 py-1">Match</Button>

        {result && (
            <div className='mt-4'>
                <p>Match: {result.matchPercentage} %</p>
                <p>Missing Keywords: </p>
                <ul>
                    {result.missingKeywords.map((k, i)=>(
                        <li key={i}>{k}</li>
                    ))}
                </ul>
                <p>Suggestions: </p>
                <ul>
                    {result.suggestions.map((s, i)=>(
                        <li key={i}>{s}</li>
                    ))}
                </ul>
            </div>
        )}
    </div>
  )
}

export default JdMatcher