import { useState } from 'react'
import MyResumes from './pages/MyResumes'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateResume from './pages/CreateResume';
import MainLayout from './layouts/MainLayout';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import JdMatcher from './pages/jdMatcher';
import CoverLetter from './pages/CoverLetter';
import InterviewChat from './pages/InterviewChat';
import Upgrade from './Upgrade';
import Success from './pages/Success';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MyResumes />} />
          <Route path="/resumes" element={<MyResumes />} />
          <Route path="/create" element={<CreateResume />} />
          <Route path='/ai-tools' element={<ResumeAnalyzer/>}/>
          <Route path='/jd-matcher' element={<JdMatcher/>}/>
          <Route path='/cover-letter' element={<CoverLetter/>}/>
          <Route path='/interview' element={<InterviewChat />}/>
          <Route path='/payment' element={<Upgrade />}/>
          <Route path='/success' element={<Success />}/>
          <Route path='/failed' element={<div>Payment Failed. Please try again.</div>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
