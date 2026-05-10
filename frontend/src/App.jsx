import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import JdMatcher from './pages/jdMatcher';
import CoverLetter from './pages/CoverLetter';
import InterviewChat from './pages/InterviewChat';
import Upgrade from './Upgrade';
import Success from './pages/Success';
import ResumeBuilder from './pages/ResumeBuilder';
import AppLayout from './layouts/AppLayout';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout/>}>
          <Route index element={<ResumeBuilder />} />
          <Route path='/ai-tools' element={<ResumeAnalyzer/>}/>
          <Route path='/jd-matcher' element={<JdMatcher/>}/>
          <Route path='/cover-letter' element={<CoverLetter/>}/>
          <Route path='/interview' element={<InterviewChat />}/>
          <Route path='/payment' element={<Upgrade />}/>
          <Route path='/success' element={<Success />}/>
          <Route path='/resume-builder' element={<ResumeBuilder />}/>
          <Route path='/failed' element={<div>Payment Failed. Please try again.</div>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
